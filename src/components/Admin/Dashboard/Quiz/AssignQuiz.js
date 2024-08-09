import Select from 'react-select';
import { useState, useEffect } from 'react';
import { getByQuizAdmin, getAllUserServices, postAssignQuizUser } from "../../../Services/apiservice"
import { toast } from 'react-toastify';


const AssignQuiz = (props) => {

  const [listQuiz, setListQuiz] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState({})

  const [listUser, setListUser] = useState([])
  const [selectedUser, setSelectedUser] = useState({})

  // useEffect
  useEffect(() => {
    fetchQuiz()
    fetchUser()
  }, [])

  const fetchQuiz = async () => {
    let res = await getByQuizAdmin()
    if (res && res.EC === 0) {
      let newListQuiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        }
      })
      setListQuiz(newListQuiz)
      // console.log("newListQuiz", newListQuiz);
    }
  }

  const fetchUser = async () => {
    let res = await getAllUserServices()
    if (res && res.EC === 0) {
      let newListUser = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        }
      })
      setListUser(newListUser)
      // console.log("newListUser", newListUser);
    }
  }

  const handleAssignQuizUser = async () => {
    let res = await postAssignQuizUser(selectedQuiz.value, selectedUser.value)
    if (res && res.EC === 0) {
      toast.success(res.EM)
    } else {
      toast.error(res.EM)
    }
  }

  return (
    <>
      <div className='assign-quiz-container row'>
        <div className='col-5 form-group'>
          <label className='mb-2'>Select Quiz :</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className='col-5 form-group'>
          <label className='mb-2'>Select User :</label>
          <Select
            defaultValue={selectedUser}
            onChange={setSelectedUser}
            options={listUser}
          />
        </div>
      </div>
      <button
        className='btn btn-warning mt-3'
        onClick={() => handleAssignQuizUser()}
      >Assign</button>
    </>
  )
}

export default AssignQuiz