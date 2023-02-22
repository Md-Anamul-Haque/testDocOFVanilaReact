import MarkdownPreview from '@uiw/react-markdown-preview';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';

const Doc = () => {
  const [source, setSource] = useState<any>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<any>(null)
  const { doc_id } = useParams();

  useEffect(() => {
    axios.get('/api/doc/' + doc_id)
      .then(res => {
        if (res.data.success) {
          setSource(res?.data?.data?.doc)
        } else {
          setIsError(res.data.message)
        }
      })
      .catch(err => {
        setIsError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [doc_id])

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
    <div>
      {isError && <Card>
        {isError}
      </Card>}
      {isLoading &&
        <Card>Loading...</Card>
      }
      {isLoading || <Container>

        <MarkdownPreview
          style={{
            width: '100%'
          }}
          source={source}
        // rehypeRewrite={(node: any, index, parent: any) => {
        //   if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
        //     parent.children = parent.children.slice(1)
        //   }
        // }}
        />
      </Container>
      }
    </div>
  )
}

export default Doc
