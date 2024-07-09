

const TableUser = (props) => {

  const { listUser, handleClickUpdate } = props


  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td className="d-flex">
                    <button className="btn btn-success "> View </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleClickUpdate(item)}
                    > Update </button>
                    <button className="btn btn-danger"> Delete </button>
                  </td>
                </tr>
              )
            })
          }
          {listUser && listUser.length === 0 &&
            <tr>
              <td colSpan="4"> not found data</td>
            </tr>
          }
        </tbody>
      </table >
    </>
  )
}

export default TableUser