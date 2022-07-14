import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate}) => {
    const pageNumbers =[]
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(x =>
                    <li key={x} className='page-item'>
                        <a onClick={() => paginate(x)} href="#" className='page-link'>{x}</a>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
