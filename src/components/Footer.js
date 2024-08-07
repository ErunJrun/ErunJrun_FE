import React from "react";
import { useLocation, useParams } from "react-router-dom";

//Redux
import { history } from "../redux/configureStore";

//css, library, package
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

//Image
import courseIcon from "../assets/footer/courseIcon.png";
import courseIconColor from "../assets/footer/courseIconColor.png";
import groupIcon from "../assets/footer/groupIcon.png";
import groupIconColor from "../assets/footer/groupIconColor.png";
import homeIcon from "../assets/footer/homeIcon.png";
import homeIconColor from "../assets/footer/homeIconColor.png";
import mypageIcon from "../assets/footer/mypageIcon.png";

//cookie
import { getCookie } from "../shared/Cookie";

//elements
import { Grid, Text } from "../elements";

const Footer = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

  const userId = localStorage.getItem("userId");
  const profileUrl = localStorage.getItem("profileUrl");
  const token = getCookie("accessToken");

  const path = useLocation().pathname;
  const isHome = path === "/";
  const isGroup =
    path === "/groupfeed" || path.slice(1, 12) === "groupdetail" ? true : false;

  const isCourse =
    path.slice(0, 11) === "/coursefeed" || path.slice(0, 11) === "/courseDeta"
      ? true
      : false;
  const isMypage = path === `/mypage/${userId}`;
  const isLoginInfo = path === "/loginInfo";
  const isGroupUpload = path === "/groupupload";

  if (isMobile) {
    return (
      <>
        {!isLoginInfo && !isGroupUpload ? (
          <>
            <Grid
              zIndex="2"
              bg="white"
              justifyContent="center"
              position="fixed"
              bottom="0"
              left="0"
              width="100%"
              height="59px"
              display="flex"
              padding="11px 42px"
              boxShadow="0px -4px 6px rgba(227, 227, 227, 0.4);"
            >
              <Grid
                width="375px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding="0 20px"
              >
                {isHome ? (
                  <>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={homeIconColor}
                        onClick={() => {
                          history.push("/");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/");
                        }}
                        margin="0"
                        width="auto"
                        color="#68F99E"
                        size="10px"
                      >
                        Home
                      </Text>
                    </Grid>

                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={groupIcon}
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/groupfeed");
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        그룹 러닝
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={courseIcon}
                        onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        추천 코스
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      {token ? (
                        <FooterProfile
                          src={profileUrl}
                          onClick={() => {
                            history.push(`/mypage/${userId}`);
                          }}
                        />
                      ) : (
                        <FooterIcon
                          src={mypageIcon}
                          onClick={() => {
                            history.push(`/mypage/${userId}`);
                          }}
                        />
                      )}

                      <Text
                        _onClick={() => {
                          history.push(`/mypage/${userId}`);
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        마이페이지
                      </Text>
                    </Grid>
                  </>
                ) : isGroup ? (
                  <>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={homeIcon}
                        onClick={() => {
                          history.push("/");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/");
                        }}
                        margin="0"
                        width="auto"
                        color="#B8B8B8"
                        size="10px"
                      >
                        Home
                      </Text>
                    </Grid>

                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={groupIconColor}
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/groupfeed");
                        }}
                        margin="0"
                        color="#68F99E"
                        size="10px"
                      >
                        그룹 러닝
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={courseIcon}
                        onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        추천 코스
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      {token ? (
                        <FooterProfile
                          src={profileUrl}
                          onClick={() => {
                            history.push(`/mypage/${userId}`);
                          }}
                        />
                      ) : (
                        <FooterIcon
                          src={mypageIcon}
                          onClick={() => {
                            history.push(`/mypage/${userId}`);
                          }}
                        />
                      )}
                      <Text
                        _onClick={() => {
                          history.push(`/mypage/${userId}`);
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        마이페이지
                      </Text>
                    </Grid>
                  </>
                ) : isCourse ? (
                  <>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={homeIcon}
                        onClick={() => {
                          history.push("/");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/");
                        }}
                        margin="0"
                        width="auto"
                        color="#B8B8B8"
                        size="10px"
                      >
                        Home
                      </Text>
                    </Grid>

                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={groupIcon}
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/groupfeed");
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        그룹 러닝
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={courseIconColor}
                        onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                        margin="0"
                        color="#68F99E"
                        size="10px"
                      >
                        추천 코스
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      {token ? (
                        <FooterProfile
                          src={profileUrl}
                          onClick={() => {
                            history.push(`/mypage/${userId}`);
                          }}
                        />
                      ) : (
                        <FooterIcon
                          src={mypageIcon}
                          onClick={() => {
                            history.push(`/mypage/${userId}`);
                          }}
                        />
                      )}
                      <Text
                        _onClick={() => {
                          history.push(`/mypage/${userId}`);
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        마이페이지
                      </Text>
                    </Grid>
                  </>
                ) : isMypage ? (
                  <>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={homeIcon}
                        onClick={() => {
                          history.push("/");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/");
                        }}
                        margin="0"
                        width="auto"
                        color="#B8B8B8"
                        size="10px"
                      >
                        Home
                      </Text>
                    </Grid>

                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={groupIcon}
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/groupfeed");
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        그룹 러닝
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={courseIcon}
                        onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        추천 코스
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      {token ? (
                        <FooterProfile
                          isMypage={true}
                          src={profileUrl}
                          onClick={() => {
                            history.push(`/mypage/${userId}`);
                          }}
                        />
                      ) : (
                        <FooterIcon
                          src={mypageIcon}
                          onClick={() => {
                            history.push(`/mypage/${userId}`);
                          }}
                        />
                      )}
                      <Text
                        _onClick={() => {
                          history.push(`/mypage/${userId}`);
                        }}
                        margin="0"
                        color="#68F99E"
                        size="10px"
                      >
                        마이페이지
                      </Text>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={homeIcon}
                        onClick={() => {
                          history.push("/");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/");
                        }}
                        margin="0"
                        width="auto"
                        color="#B8B8B8"
                        size="10px"
                      >
                        Home
                      </Text>
                    </Grid>

                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={groupIcon}
                        onClick={() => {
                          history.push("/groupfeed");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/groupfeed");
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        그룹 러닝
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={courseIcon}
                        onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push("/coursefeed/0");
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        추천 코스
                      </Text>
                    </Grid>
                    <Grid
                      display="flex"
                      alignItems="center"
                      width="auto"
                      flexDirection="column"
                    >
                      <FooterIcon
                        src={mypageIcon}
                        onClick={() => {
                          history.push(`/mypage/${userId}`);
                        }}
                      />
                      <Text
                        _onClick={() => {
                          history.push(`/mypage/${userId}`);
                        }}
                        margin="0"
                        color="#B8B8B8"
                        size="10px"
                      >
                        마이페이지
                      </Text>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </>
        ) : null}
      </>
    );
  }

  return (
    <>
      {isLoginInfo ? null : (
        <HeaderBox>
          <Grid width="1200px" display="flex" alignItems="center">
            <Grid
              display="flex"
              width="685px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Logo
                onClick={() => {
                  history.push("/");
                }}
              >
                <img src="https://ifh.cc/g/fkqsm3.png" />
              </Logo>
            </Grid>

            <Grid display="flex" width="600px" margin="-80px 0 0 260px">
              <Grid width="200px">
                <Text color="#68f99e" size="18px">
                  Backend
                </Text>
                <Text regular color="#FAFAFA" size="13px">
                  유현준 &nbsp; 오지우 &nbsp; 신동영
                </Text>
              </Grid>

              <Grid width="200px">
                <Text color="#68f99e" size="18px">
                  Frontend
                </Text>

                <Text regular color="#FAFAFA" size="13px">
                  유진열 &nbsp; 김다운
                </Text>
              </Grid>
              <Grid width="200px">
                <Text color="#68f99e" size="18px">
                  Designer
                </Text>
                <Text regular color="#FAFAFA" size="13px">
                  김희영 &nbsp; 방남지
                </Text>
              </Grid>
            </Grid>

            {/* <Btn
                onClick={() => {
                  history.push("/serviceInfo");
                }}
              >
                서비스 소개
              </Btn>
              <Btn
                onClick={() => {
                  history.push("/privacyPolicy");
                }}
              >
                개인정보처리방침
              </Btn>
              <Btn
                onClick={() => {
                  history.push("/serviceTerms");
                }}
              >
                이용약관
              </Btn>
              <Btn
                onClick={() => {
                  history.push("/contact");
                }}
              >
                Contact
              </Btn> */}
          </Grid>
        </HeaderBox>
      )}
    </>
  );
};

const HeaderBox = styled.div`
  display: flex;
  min-height: 216px;
  height: 100%;
  background-color: #030c37;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.div`
  width: 128px;
  height: 71.1px;
  margin-right: 20px;
  cursor: pointer;
`;

const Btn = styled.button`
  cursor: pointer;
  border: none;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 0.8rem;
  color: #ffffff;
  background-color: transparent;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  margin-left: 30px;
  :hover {
    color: #68f99e;
  }
`;

const FooterIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const FooterProfile = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;

  ${(props) =>
    props.isMypage ? `border:1px solid #68f99e;` : `border:1px solid #B8B8B8;`}
`;

export default Footer;
