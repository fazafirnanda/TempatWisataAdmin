import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import Swal from "sweetalert2";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "utils/firebase";
import { ThemeContext } from "layouts/Admin";
const NotificationDropdown = ({ id }) => {
  // dropdown props
  const { context, setContext } = useContext(ThemeContext);

  console.log(id);
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "wisata", id));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data Berhasil Dihapus",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    closeDropdownPopover();
    setContext({ ...context, editWisata: true, idWisata: id });
  };
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <button
          href="#pablo"
          className=" active:bg-blueGray-50 text-sm text-right hover:shadow-lg  px-6 py-3 rounded   outline-none focus:outline-none   w-full ease-linear transition-all duration-150"
          onClick={(e) => handleDelete(e)}
        >
          Delete
        </button>
        <button
          href="#pablo"
          className={
            "text-sm py-2 px-6 font-normal block w-full whitespace-nowrap text-blueGray-700 text-right"
          }
          onClick={(e) => handleEdit(e)}
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default NotificationDropdown;
