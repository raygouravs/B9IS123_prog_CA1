/*
  Reference: The following code snippets have been taken from Chat-GPT, and used directly without modification (re-usable code).

  1. Lines 105-113: Scrolling div
      <div
      style={{
      marginTop: "20px",
      padding: "10px",
      border: "1px solid lightgray",
      borderRadius: "5px",
      height: "300px",
      overflowY: "scroll"
      }}
*/

import { useState } from 'react'
import "./adminmembermanagement.css";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAllMembers, getMemberById, createMember, updateMember, deleteMember } from "./memberService";


function DeskManagement() {

  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  
  const loadMembers = () => {
    getAllMembers().then((res) => {
      setMembers(res);
    });
  };

  const handleCreate = () => {
    const data = document.getElementById("member_create_name").value;
    console.log("member_create_name - " + data);
    const [full_name, email, phone, company, membership_type, join_date] = data
    .split(",")
    .map(item => item.trim());
    const status = "Active"
    console.log("Create member - " + full_name + "," + email + "," + phone + "," + company + "," + membership_type + "," + join_date);
    const result = {
      member: {
        full_name,
        email,
        phone,
        company,
        membership_type,
        join_date,
        status
      }
    };
    createMember(result).then(loadMembers);
  };

  const handleUpdate = () => {
    const member_id = document.getElementById("member_id").value;
    const up_full_name = document.getElementById("up_full_name").value;
    const up_email = document.getElementById("up_email").value;
    const up_phone = document.getElementById("up_phone").value;
    const up_company = document.getElementById("up_company").value;
    const up_membership_type = document.getElementById("up_membership_type").value;
    const up_join_date = document.getElementById("up_join_date").value;

    const result = {
        full_name: up_full_name,
        email: up_email,
        phone: up_phone,
        company: up_company,
        membership_type: up_membership_type,
        join_date: up_join_date
    }
    updateMember(member_id, result).then(loadMembers);
  };

  const handleDelete = () => {
    const id = document.getElementById("member_delete_id").value;
    deleteMember(id).then(loadMembers).catch((err) => {
      if (err.response && err.response.status === 500){
        alert("Cannot delete due to referential integrity constraints!");
      } else {
        alert("Error deleting!")
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    
  <div style={{ paddingTop: "250px" }}>
      <button onClick={handleBack} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Back</button>
      <h2>Member Management</h2>
      <h3>Create Member</h3>
   
      <input id="member_create_name" placeholder="full_name, email, phone, company, membership_type, join_date" style={{width: 380, borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}} />
      <p>Membership Type: 1. individual 2. corporate 3. student 4. admin;</p>
      <button onClick={handleCreate} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Create</button>


      <h3>All Members</h3>
      <button onClick={loadMembers} style={{height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Load Members</button>

      <div
      style={{
      marginTop: "20px",
      padding: "10px",
      border: "2px solid teal",
      borderRadius: "10px",
      height: "300px",
      overflowY: "scroll"
      }}
>
      {members.map((d) => (
        <p key={d.member_id}>
        member_id - {d.member_id}, full name - {d.full_name}, email - {d.email},
        phone - {d.phone}, company - {d.company}, membership-type - {d.membership_type}, join-date - {d.join_date}, status - {d.status};
        </p>
      ))}
      </div>

  
      <h3>Update Member</h3>
      <input id="member_id" placeholder="Member ID" style={{marginRight: '5px', borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}}/>
      <input id="up_full_name" placeholder="New Full Name" style={{marginRight: '5px', borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}}/>
      <input id="up_email" placeholder="New Email" style={{marginRight: '5px', borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}}/>
      <input id="up_phone" placeholder="New Phone" style={{marginRight: '5px', borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}}/>
      <input id="up_company" placeholder="New Company" style={{marginRight: '5px', borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}}/>
      <input id="up_membership_type" placeholder="New Membership Type" style={{marginRight: '5px', borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}}/>
      <input id="up_join_date" placeholder="New Join Date" style={{marginRight: '5px', borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}}/>
      <button onClick={handleUpdate} style={{marginLeft: 10, height: 40, backgroundColor: 'lightblue', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Update</button>

      <h3>Delete Member</h3>
      <input id="member_delete_id" placeholder="Member ID" style={{marginRight: '5px', borderColor: 'teal', borderWidth: '1px', borderRadius: '5px'}}/>
      <button onClick={handleDelete} style={{marginLeft: 10, marginBottom:50, height: 40, backgroundColor: 'red', color: 'white', justifyContent: 'center', alignContent: 'center'}}>Delete</button>
    </div>
  );
}

export default DeskManagement

