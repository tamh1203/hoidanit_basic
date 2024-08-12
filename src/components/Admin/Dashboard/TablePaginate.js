import ReactPaginate from 'react-paginate';
import { useTranslation } from 'react-i18next';
import React from 'react';


const TablePaginate = (props) => {

  const { t } = useTranslation();


  const { listUser, handleClickUpdate, handleClickViewUser, handleClickBtnDeleteUser, pageCount } = props

  const handlePageClick = (event) => {
    props.fetchListUserWithPaginate(+event.selected + 1)// set trang khi click page
    props.setCurrentPage(+event.selected + 1) // set page đang đứng khi tạo mới user
    console.log(`User requested page number ${event.selected}`)
  };

  return (
    <>

      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">{t("table-paginate.th1")}</th>
            <th scope="col">{t("table-paginate.th1")}</th>
            <th scope="col">{t("table-paginate.th1")}</th>
            <th scope="col">{t("table-paginate.th1")}</th>
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
                    > {t("table-paginate.btnview")} </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleClickUpdate(item)}
                    > {t("table-paginate.btnupdate")} </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDeleteUser(item)}
                    > {t("table-paginate.btndelete")} </button>
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
      <div className='d-flex justify-content-center'>
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}

          forcePage={props.currentPages - 1} // ép trả về page 1 khi chúng ta tạo mới user
        />
      </div>
    </>
  )
}


export default TablePaginate