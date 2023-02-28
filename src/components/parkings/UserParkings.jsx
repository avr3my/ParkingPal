import {useState} from 'react'
import AddAndEditParking from "../../components/addParking/AddAndEditParking"


export default function UserParkings() {
  const [addParking, setAddParking]=useState(false);

  return (
    <div className='user-parkings'>
      <h2>my parkings</h2>
      <button onClick={()=>setAddParking(true)}>add parking</button>
      {addParking && <AddAndEditParking setAddParking={setAddParking} parkingId={null}/>}
    </div>
  )
}
