import { useEffect, useState } from "react"
import BlogDetail from "./BlogDetail"

export default function Blog({ setPage }) {
  return (
    <>
      <div className="post">
        <h3>Lorem ipsum dolor sit.</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, rem? Debitis a vel provident ipsa eveniet, ex vero expedita laboriosam?</p>
        <a href="#" onClick={() => setPage(<BlogDetail setPage={setPage} />)}>devamı</a>
      </div>
      <hr />
      <div className="post">
        <h3>Lorem ipsum dolor sit.</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, rem? Debitis a vel provident ipsa eveniet, ex vero expedita laboriosam?</p>
        <a href="#" onClick={() => setPage(<BlogDetail setPage={setPage} />)}>devamı</a>
      </div>
      <hr />
      <div className="post">
        <h3>Lorem ipsum dolor sit.</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, rem? Debitis a vel provident ipsa eveniet, ex vero expedita laboriosam?</p>
        <a href="#" onClick={() => setPage(<BlogDetail setPage={setPage} />)}>devamı</a>
      </div>
    </>
  )
}