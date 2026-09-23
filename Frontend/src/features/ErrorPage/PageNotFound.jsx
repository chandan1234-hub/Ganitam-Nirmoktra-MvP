import './PageNotFound.css'
const PageNotFound = () => {
  return (
    < div className="error-page" >
      <div className="face">
        <div className="band">
          <div className="red"></div>
          <div className="white"></div>
          <div className="blue"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples"></div>
        <div className="mouth"></div>
      </div>

      <h1>Oops! Something went wrong!</h1>
      <div className="btn"
      onClick={()=>window.location.href='/'}>Return to Home</div>
    </div >
  )
}

export default PageNotFound;
