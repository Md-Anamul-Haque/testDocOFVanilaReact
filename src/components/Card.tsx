import styled from 'styled-components'

const Card = styled.div`
    box-shadow: 0 0 3px 5px #9985;
    border-radius: 8px;
    /* border: 2px dashed silver; */
    display: grid;
    place-items: center;
    padding: 10px;
    text-align: center;
  @media (min-width: '1024px') {
    font-family: 'Courier New', Courier, monospace;
  }
  @media (prefers-color-scheme: dark) {
    background: #333;
    color: white;
}
`

export default Card
