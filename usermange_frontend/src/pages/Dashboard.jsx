import React, { useState, useEffect } from 'react';
import { authService } from '../service/authServices';
import '../styles/Dashboard.css';
const PasswordChangeModal = ({ isOpen, onClose, onSave }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    if(!isOpen){ return null;    
       }
    const handlesave= async()=>{
        if(newPassword !== confirmNewPassword){
            setError("New Password and Confirm New Password do not match");
            return;
        }
        try{
            await authService.changePassword(currentPassword , newPassword);
        }
        catch(error){
            setError("Failed to change password. Please try again.");
            console.log("Failed to change password", error);
            return;
        } 
    }
    return(
       <>
         <div className="modal-overlay">
            <div className="modal-content">
                <h2>Change Password</h2>
                {error && <div className="error-message">{error}</div>
                }
                <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" value={currentPassword} onChange={(e)=> setCurrentPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
                </div>
                .form=group
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" value={confirmNewPassword} onChange={(e)=> setConfirmNewPassword(e.target.value)} />
                </div>
                <div className="modal-actions">
                    <button className="btn btn-primary" onClick= {onClose}>Cancel

                    </button>
                    <button className="btn btn-primary" onClick={handlesave}>Save</button>
                    </div>

            </div>
         </div>
       </>
    )

}
const UserTable =()=>{
    const[allusers , setallusers] = useState([]);
    const[loading , setloading] = useState(true);
    const[error , seterror] = useState('');
    useEffect(()=>{
        const fetchAllUser = async()=>{
            try{
                const response = await authService.fetchAllUsers();
                setallusers(response);
                setloading(false);
            }
            catch(error){
                seterror("Failed to fetch users");
                setloading(false);
                console.log("Failed to fetch users", error);
            }
        }
        fetchAllUser();
    },[])
    if(loading){
        return <div className = "loading-spinner">Loading...</div>;
    }
    if(error){
        return <div className = "error-message">{error}</div>;
    }
    const handledeleteuser = async(userId) =>{
        try{
            await authService.deleteUser(userId);
            setallusers(prevUsers => prevUsers.filter(user => user.id !== userId));
        }
        catch(error){
            seterror("Failed to delete user");
            console.log("Failed to delete user", error);
        }
    }
    return(
        <div className="users-table-container">
            <h1>mange All User</h1>
            <div className="users-table">
                <thead>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {allusers.map(user=>{
                        <tr key ={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-danger" onClick ={()=> handledeleteuser(user.id)}>Delete User</button>
                            </td>
                            </tr>
                    })}
                </tbody>
            </div>
        </div>
    )

}


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState('home');
    const [loading, setLoading] = useState(true);
    // admin
    const [isAdmin, setIsAdmin] = useState(false);

    const [isEditing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await authService.fetchCurrentUser();
                setUser(currentUser);
                setEditedUser(currentUser);

                const userRoles = currentUser.roles || [];
                setIsAdmin(userRoles.includes('ROLE_ADMIN'));
            } catch (error) {
                console.log("Failed to fetch user data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleEditToggle = () => {
        setEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveProfile = async () => {
        try {
            await authService.updateprofile(editedUser);
            setUser(editedUser);
            setEditing(false);
        } catch (error) {
            console.log("Failed to update profile", error);
        }
    };

    const handleCancelEdit = () => {
        setEditedUser(user);
        setEditing(false);
    };

    if (loading) {
        return <div className = "loading-spinner">Loading...</div>;
    }
    if(error){
        return <div className = "error-message">{error}</div>;
    }

    return (
        <div>
            <div className="dashboard-container">
                <div className="dashboard-sidebar">
                    <div className={`dashboard-menu-item ${activeSection === 'home' ? 'active' : ''}`}
                        onClick={() => setActiveSection('home')}>
                        Home
                    </div>
                    <div className={`dashboard-menu-item ${activeSection === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveSection('profile')}>
                        Profile
                    </div>
                    <div className={`dashboard-menu-item ${activeSection === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveSection('settings')}>
                        Settings
                    </div>
                    {isAdmin && (
                        <div className={`dashboard-menu-item ${activeSection === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveSection('users')}>
                            Users
                        </div>
                    )}
                </div>
                <div className="dashboard-content">
                    {activeSection === 'home' && (
                        <div className="dashboard-home">
                            <h1>Welcome, {user?.username}</h1>
                            <p>This is your dashboard home.</p>
                        </div>
                    )}
                    {activeSection === 'profile' && (
                        <div className="dashboard-profile">
                            <h2>Profile</h2>
                            <div className="profile-details">
                                <div className="profile-field">
                                    <label>Username </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={isEditing ? editedUser.username : user.username}
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className="profile-field">
                                    <label>Email </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={isEditing ? editedUser.email : user.email}
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                    />
                                </div>
                                <div className="profile-actions">
                                    {isEditing ? (
                                        <>
                                            <button className="btn btn-primary" onClick={handleSaveProfile}>Save</button>
                                            <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-primary" onClick={handleEditToggle}>Edit</button>
                                            <button className="btn btn-secondary" onClick={() => setPasswordModalOpen(true)}>Change Password</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {activeSection === 'settings' && (
                        <div className="dashboard-settings">
                            <h1>Settings, {user?.username}</h1>
                            <p>This is your Settings.</p>
                        </div>
                    )}
                    {activeSection === 'users' && isAdmin && (
                        <UserTable />
                    )}
                </div>
                <isPasswordModalOpen isOpen={isPasswordModalOpen}
                    onClose={() => setPasswordModalOpen(false)}
                    onSave={()=>{
                        console.log("Password changed");
                    }} />
            </div>
        </div>
    );
};


export default Dashboard;
