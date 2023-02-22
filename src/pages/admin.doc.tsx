import MarkdownEditor from "@uiw/react-markdown-editor";
import MarkdownPreview from '@uiw/react-markdown-preview';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { CUD, CUDManager } from '../CUD';

export default function AdminDoc() {
  const [value, setValue] = useState<any>()
  const [valueCopy, setValueCopy] = useState<any>()
  const [timeOfSave, setTimeOfSave] = useState<any>()
  const [isError, setIsError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // const [isCtrl, setisCtrl] = useState<boolean>(false)
  const navigator = useNavigate()

  const isCtrl = useRef<any>(null)
  const { doc_id } = useParams();
  // check auth
  useEffect(() => {
    axios.get('/api/sign-in')
      .then((res: any) => {
        // eslint-disable-next-line eqeqeq
        if (!res.data?.success && res.data?.isLogdin != 'yes') {
          navigator('/sign-in')
        }
      })
      .catch(err => {
        setIsError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      });


    axios.interceptors.response.use(function (response) {
      // eslint-disable-next-line eqeqeq
      if (response.data?.success == false && response.data?.isLogdin == 'no') {
        navigator('/sign-in')
      }
      return response;
    }, function (error) {
      return Promise.reject(error);
    });

  }, [])
  useEffect(() => {
    axios.get('/api/doc/' + doc_id)
      .then(res => {
        if (res.data.success) {
          setValue(res?.data?.data?.doc)
          setValueCopy(res?.data?.data?.doc)
        }
      })
      .catch(err => {
        setIsError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, []);

  const handleSubmit = () => {
    // alert(value != valueCopy)
    if (timeOfSave) {
      clearTimeout(timeOfSave)
    }
    setValueCopy(JSON.parse(JSON.stringify(value)))
    CUD.post({
      url: '/api/doc/' + doc_id,
      data: {
        doc: value,
      }
    }, (res, err) => {
      console.log({ res, err })
    })

  }


  const handleOnChange = (v: any) => {
    if (timeOfSave) {
      clearTimeout(timeOfSave)
    }
    setValue(v)
    setTimeOfSave(setTimeout(() => {
      handleSubmit()
    }, 5000));

  }
  const handleOnKeyDown = (e: any) => {
    if (e.keyCode === 17) {
      e.preventDefault();
      isCtrl.current = true  // = true;
    }
    if (e.keyCode === 83 && isCtrl.current) {
      e.preventDefault();
      // your save logic goes here
      // eslint-disable-next-line eqeqeq
      if (value != valueCopy) handleSubmit()
    }
  }
  const handleOnKeyUp = (e: any) => {
    e.preventDefault();
    if (isCtrl.current) {
      isCtrl.current = false  // isCtrl = false;
    }

  }

  const Container = styled.div`
  width: auto;
  display: block;
  /* margin: 100px; */
   background-color: transparent;
   padding:10px;
   @media (min-width: 360px) {
    padding:30px;
  }
  @media (min-width: 560px) {
    padding:40px;
  }
  @media (min-width: 720px) {
    padding:60px;
  }
  @media (min-width: 1024px) {
    padding:80px;
  }
`;
  return (
    <div className="container">
      <CUDManager />
      {isLoading && <Card>
        Loading...
      </Card>}
      {isError && <Card>
        {isError}
      </Card>}
      {isLoading || <MarkdownEditor
        height="95vh"
        visible
        value={value || ''}
        onKeyDown={handleOnKeyDown}
        onKeyUp={handleOnKeyUp}
        onChange={handleOnChange}
      // toolbars={["bold", "italic", title2]}
      />}
      {/* <button onClick={handleSubmit}>Submit</button> */}
      <Container>
        <MarkdownPreview source={value || ''} />
      </Container>
    </div>
  );
}
