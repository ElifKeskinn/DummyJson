import Blog from "./Blog";

export default function BlogDetail({ setPage }) {
  return(
    <>
      <a href="#" onClick={() => setPage(<Blog setPage={setPage} />)}>◀️ geri</a>
      <hr />
      <h3>Lorem ipsum dolor sit.</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, rem? Debitis a vel provident ipsa eveniet, ex vero expedita laboriosam?</p>
    </>
  )
}