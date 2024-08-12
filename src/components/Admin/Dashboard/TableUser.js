import { useTranslation } from 'react-i18next';

const TableUser = (props) => {

  const { listUser, handleClickUpdate, handleClickViewUser, handleClickBtnDeleteUser } = props
  const { t } = useTranslation();

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">{t("table-user.th1")}</th>
            <th scope="col">{t("table-user.th2")}</th>
            <th scope="col">{t("table-user.th3")}</th>
            <th scope="col">{t("table-user.th4")}</th>
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
                    <button
                      className="btn btn-success "
                      onClick={() => handleClickViewUser(item)}
                    > View </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleClickUpdate(item)}
                    > Update </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDeleteUser(item)}
                    > Delete </button>
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