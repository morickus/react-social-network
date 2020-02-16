import React from 'react';
import styles from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/users.png';

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChange = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {this.props.setUsers(response.data.items);
        });
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for(let i=this.props.currentPage; i <= pagesCount && i <= this.props.currentPage + 9; i++) {
            pages.push(i);
        }

        return (
            <div>
                <div className={styles.pagination}>
                    {pages.map( p => <span key={p} className={this.props.currentPage === p && styles.selectedPage} 
                        onClick={ (e) =>  {this.onPageChange(p);} }>{p}</span> )}
                </div>
                {this.props.users.map(u =>
                    <div key={u.id}>
                        <span>
                            <div><img src={u.photos.small != null ? u.photos.small : userPhoto} alt="ava" className={styles.userPhoto} /></div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => { this.props.unfollow(u.id) }} >Unfollow</button>
                                    : <button onClick={() => { this.props.follow(u.id) }} >Follow</button>
                                }
                            </div>
                        </span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                    </div>
                )}
            </div>
        )
    }
}

export default Users;