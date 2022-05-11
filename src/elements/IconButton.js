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

const IconButton = (props) => {
  const {
    waring,
    _onClick,
    pencil,
    Table,
    facebookLogo,
    likeIcon,
    unLikeIcon,
    commentIcon,
    plusIcon,
    checkIcon,
    leftArrowIcon,
    moreView,
    compass,
    message,
    home,
    size,
    height,
    margin,
    padding,
    cursor,
    color,
    airplane,
    bookmark,
    bookmarkFill,
    cancle,
    photo,
    location,
    setting,
    smile,
    zIndex,
    filter,
    moreDot,
    alarm,
    upArrow,
    downArrow,
    cancelRound,
    calendar,
    cancelRoundBlack,
  } = props;

  const styles = {
    padding: padding,
    size: size,
    height: height,
    margin: margin,
    cursor: cursor,
    color: color,
    zIndex: zIndex,
  };

  //아이콘 작동
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

  if (alarm) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <IoMdNotificationsOutline
            size={size}
            onClick={_onClick}
          ></IoMdNotificationsOutline>
        </Icon>
      </React.Fragment>
    );
  }

  if (calendar) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <FcCalendar size={size} onClick={_onClick}></FcCalendar>
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

  if (filter) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <FcFilledFilter size={size} onClick={_onClick}></FcFilledFilter>
        </Icon>
      </React.Fragment>
    );
  }

  if (Table) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <AiOutlineTable size={size} onClick={_onClick}></AiOutlineTable>
        </Icon>
      </React.Fragment>
    );
  }
  if (pencil) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <HiPencilAlt size={size} onClick={_onClick}></HiPencilAlt>
        </Icon>
      </React.Fragment>
    );
  }

  if (facebookLogo) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <AiFillFacebook size={size} onClick={_onClick}></AiFillFacebook>
        </Icon>
      </React.Fragment>
    );
  }
  if (likeIcon) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <FcLike size={size} onClick={_onClick}></FcLike>
        </Icon>
      </React.Fragment>
    );
  }
  if (unLikeIcon) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <AiOutlineHeart size={size} onClick={_onClick}></AiOutlineHeart>
        </Icon>
      </React.Fragment>
    );
  }
  if (commentIcon) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <FaRegComment size={size} onClick={_onClick}></FaRegComment>
        </Icon>
      </React.Fragment>
    );
  }
  if (plusIcon) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <MdOutlineAddBox size={size} onClick={_onClick}></MdOutlineAddBox>
        </Icon>
      </React.Fragment>
    );
  }
  if (bookmarkFill) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsFillBookmarkFill
            size={size}
            onClick={_onClick}
          ></BsFillBookmarkFill>
        </Icon>
      </React.Fragment>
    );
  }
  if (checkIcon) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <AiOutlineCheck size={size} onClick={_onClick}></AiOutlineCheck>
        </Icon>
      </React.Fragment>
    );
  }
  if (leftArrowIcon) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BiArrowBack size={size} onClick={_onClick}></BiArrowBack>
        </Icon>
      </React.Fragment>
    );
  }
  if (moreView) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsThreeDots size={size} onClick={_onClick}></BsThreeDots>
        </Icon>
      </React.Fragment>
    );
  }
  if (compass) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <FaRegCompass size={size} onClick={_onClick}></FaRegCompass>
        </Icon>
      </React.Fragment>
    );
  }
  if (message) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BiMessageRounded size={size} onClick={_onClick}></BiMessageRounded>
        </Icon>
      </React.Fragment>
    );
  }
  if (home) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <HiHome size={size} onClick={_onClick}></HiHome>
        </Icon>
      </React.Fragment>
    );
  }

  if (cancle) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <AiOutlineClose size={size} onClick={_onClick}></AiOutlineClose>
        </Icon>
      </React.Fragment>
    );
  }

  if (airplane) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <IoPaperPlaneOutline
            size={size}
            onClick={_onClick}
          ></IoPaperPlaneOutline>
        </Icon>
      </React.Fragment>
    );
  }

  if (bookmark) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <BsBookmark size={size} onClick={_onClick}></BsBookmark>
        </Icon>
      </React.Fragment>
    );
  }

  if (photo) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <MdOutlineAddAPhoto
            size={size}
            onClick={_onClick}
          ></MdOutlineAddAPhoto>
        </Icon>
      </React.Fragment>
    );
  }

  if (location) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <GoLocation size={size} onClick={_onClick}></GoLocation>
        </Icon>
      </React.Fragment>
    );
  }

  if (smile) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <CgSmile size={size} onClick={_onClick}></CgSmile>
        </Icon>
      </React.Fragment>
    );
  }

  if (setting) {
    return (
      <React.Fragment>
        <Icon {...styles}>
          <IoSettingsSharp size={size} onClick={_onClick}></IoSettingsSharp>
        </Icon>
      </React.Fragment>
    );
  }
  return <React.Fragment></React.Fragment>;
};

// IconButton DefaultProps
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
  cursor: "pointer",
  color: "white",
  zIndex: null,
};

const Icon = styled.div`
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  ${(props) => (props.color ? `color:${props.color};` : "")}
  z-index: ${(props) => props.zIndex};
`;

export default IconButton;
