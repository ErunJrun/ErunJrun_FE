import React, { useState } from 'react';
import "../../shared/Modal.css";
import { FiHelpCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const MyModal = () => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    return (
        <div>
            <button
            className="btn-modal"
            onClick = {toggleModal}>
                <FiHelpCircle/> 
            </button>

            {modal && (
                <div>
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <p> 굿러너 레벨 정의 설명</p>
                        <p> 레벨 안내</p>
                        <button
                        className="close-modal"
                        onClick = {toggleModal}>
                            <AiOutlineClose/>
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default MyModal;
