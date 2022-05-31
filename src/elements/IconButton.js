import React from "react";
import styled from "styled-components";
import { AiOutlineHeart, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiArrowBack, BiMessageRounded } from "react-icons/bi";
import { FaRegComment, FaRegCompass } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { MdOutlineAddBox, MdOutlineAddAPhoto } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineTable } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { IoPaperPlaneOutline, IoSettingsSharp } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { CgSmile } from "react-icons/cg";
import { BsFillBookmarkFill } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";
import { FcFilledFilter } from "react-icons/fc";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { VscDebugRestart } from "react-icons/vsc";

const IconButton = (props) => {
  const {
    reset,
    waring,
    _onClick,
    size,
    height,
    margin,
    padding,
    cursor,
    color,
    zIndex,
    moreDot,
    upArrow,
    downArrow,
    cancelRound,
    cancelRoundBlack,
    position,
  } = props;

  const styles = {
    padding: padding,
    size: size,
    height: height,
    margin: margin,
    cursor: cursor,
    color: color,
    zIndex: zIndex,
    position: position,
  };

  //아이콘 작동
  if (reset) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <VscDebugRestart size={size} onClick={_onClick}></VscDebugRestart>
        </Icon>
      </React.Fragment>
    );
  }

  if (waring) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <RiErrorWarningFill
            size={size}
            onClick={_onClick}
          ></RiErrorWarningFill>
        </Icon>
      </React.Fragment>
    );
  }

  if (cancelRoundBlack) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <MdCancel size={size} onClick={_onClick}></MdCancel>
        </Icon>
      </React.Fragment>
    );
  }

  if (cancelRound) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <MdOutlineCancel size={size} onClick={_onClick}></MdOutlineCancel>
        </Icon>
      </React.Fragment>
    );
  }

  if (upArrow) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <MdOutlineKeyboardArrowUp
            size={size}
            onClick={_onClick}
          ></MdOutlineKeyboardArrowUp>
        </Icon>
      </React.Fragment>
    );
  }

  if (downArrow) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <MdOutlineKeyboardArrowDown
            size={size}
            onClick={_onClick}
          ></MdOutlineKeyboardArrowDown>
        </Icon>
      </React.Fragment>
    );
  }

  if (moreDot) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BiDotsVerticalRounded
            size={size}
            onClick={_onClick}
          ></BiDotsVerticalRounded>
        </Icon>
      </React.Fragment>
    );
  }

  return <React.Fragment></React.Fragment>;
};

IconButton.defaultProps = {
  delete: false,
  size: "24px",
  height: "24px",
  margin: null,
  padding: null,
  _onClick: () => {},
  likeIcon: false,
  unLikeIcon: false,
  commentIcon: false,
  plusIcon: false,
  checkIcon: false,
  leftArrowIcon: false,
  moreView: false,
  width: "100%",
  color: "white",
  zIndex: null,
  position: null,
  cursor: null,
};

const Icon = styled.div`
  cursor: ${(props) => props.cursor};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  ${(props) => (props.color ? `color:${props.color};` : "")}
  z-index: ${(props) => props.zIndex};
  position: ${(props) => props.relative};
`;

export default IconButton;
