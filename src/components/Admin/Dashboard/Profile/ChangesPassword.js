import { toast } from "react-toastify";
import { postChangesPassword } from "../../../../Services/apiservice";
import { useState } from "react";

const ChangePassWord = () => {

  const [passWordCurrent, setPassWordCurrent] = useState("")
  const [passWordNew, setPassWordNew] = useState("")
  const [passWordRepeat, setPassWordRepeat] = useState("")

  const handleChangePassWord = async (event) => {
    event.preventDefault();
    let res = await postChangesPassword(passWordCurrent, passWordNew, passWordRepeat)
    if (res && res.EC === 0) {
      toast.success(res.EM)
    } else {
      toast.error(res.EM)
    }
    // console.log("check res", res);
  }

  return (
    <>
      <form className="row g-3">
        <div className="">
          <label className="form-label text-primary ">Password Current</label>
          <input
            type="password"
            placeholder='Password current'
            className="form-control"
            value={passWordCurrent}
            disabled={false}
            onChange={(event) => setPassWordCurrent(event.target.value)}
          />
        </div>
        <div className="">
          <label className="form-label text-primary">New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            value={passWordNew}
            onChange={(event) => setPassWordNew(event.target.value)}
          />
        </div>
        <div className="">
          <label className="form-label text-success">Repeat Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Repeat Password"
            value={passWordRepeat}
            onChange={(event) => setPassWordRepeat(event.target.value)}
            disabled={false}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={(event) => handleChangePassWord(event)}
          >
            Change Password
          </button>
        </div>
      </form>
    </>
  )
}

export default ChangePassWord;