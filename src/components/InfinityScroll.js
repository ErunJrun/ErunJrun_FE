import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import { Spinner } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { getGroupDB, resetGroup } from "../redux/modules/feed";

const InfinityScroll = (props) => {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feed.list);
  const paging = useSelector((state) => state.feed.paging);
  const isLoading = useSelector((state) => state.feed.isLoading);

  const { category, children, callNext, is_next, loading } = props;

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(feedList);

  console.log(page);

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (isLoading) {
        return;
      }
      console.log("실행되나");
      dispatch(getGroupDB(category, page + 1));
      setPage(page + 1);
    }
  }, 300);

  const handleScroll = useCallback(_handleScroll, [isLoading]);

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    window.addEventListener("scroll", handleScroll, true);
    // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가합니다.

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거합니다.
    };
  }, [handleScroll, isLoading]);

  return (
    <React.Fragment>
      {children}
      {paging.is_next && <Spinner />}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};
export default InfinityScroll;
