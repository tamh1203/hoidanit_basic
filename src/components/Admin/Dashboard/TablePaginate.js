import ReactPaginate from 'react-paginate';

import React, { useEffect, useState } from 'react';


const TablePaginate = (props) => {



  const { listUser, handleClickUpdate, handleClickViewUser, handleClickBtnDeleteUser, pageCount } = props

  const handlePageClick = (event) => {
    props.fetchListUserWithPaginate(+event.selected + 1)
    props.setCurrentPage(+event.selected + 1) // set page đang đứng khi tạo mới user
    console.log(`User requested page number ${event.selected}`)
  };

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
          forcePage={props.currentPages - 1}// ép trả về page 1 khi chúng ta tạo mới user
        />
      </div>
    </>
  )
}


export default TablePaginate