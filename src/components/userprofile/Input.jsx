export default function Input({general, edit, data, refr}) {
  const symbols = {
    name: "fa-solid fa-address-card",
    phone: "fa-solid fa-phone",
    email: "fa-solid fa-envelope",
  };
  
  const index = ["name", "phone", "email"].indexOf(data);;
  const handleChange = (e) => {
    switch (data) {
        case "name":
            general.setUserData({...general.userData, name: e.target.value});
            break;
        case "phone":
            general.setUserData({...general.userData, phone: e.target.value});
            break;
        case "email":
            general.setUserData({...general.userData, email: e.target.value});
            break;   
        default:
            break;
    }
  };
  return (
    <div className={`input ${data}`}>
      <div>
        <i className={symbols[data]}></i>
        <span> {["Name", "Phone", "Email"][index]}: </span>
        {general.userData && (
          <input
            readOnly={!edit}
            ref={refr}
            type="text"
            value={general.userData[data]}
            className="user-detail-input"
            onChange={handleChange}
          />
        )}
      </div>
      <div className="update-div">
        {edit ? (
          <span className="edit-menu">
            <span
              onClick={() => general.setEdit(index)}
              title="cancel"
              className="material-symbols-outlined"
            >
              cancel
            </span>
            <span
              title="save"
              onClick={() => general.updateDocument(data)}
              className="material-symbols-outlined"
            >
              save
            </span>
          </span>
        ) : (
          <span
            title="edit"
            onClick={() => general.setEdit(index)}
            className="edit-btn material-symbols-outlined"
          >
            edit
          </span>
        )}
      </div>
    </div>
  );
}
