import { message } from "antd";
import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ThemeType } from "../../../../../global/theme";
import { badgeDetailState } from "../../../../../recoil/BadgeDetail";
import Badge from "../../../../containers/badge";

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 60px;
`;
const UserBackgroundImg = styled.img`
  border-radius: 3%;
  filter: blur(2px);
  width: 700px;
  height: 250px;
`;

const UserImg = styled.img`
  border-radius: 50%;
  position: absolute;
  top: 100px;
  width: 200px;
`;

const BadgeList = styled.div`
  display: flex;
  gap: 15px;
  position: absolute;
  top: 235px;
  right: 50px;
`;

interface IBadgeHeader extends ThemeType {
  isLike: boolean;
}

export const BadgeHeader = ({ isLike }: IBadgeHeader) => {
  const [likeBadge, setLikeBadge] = useRecoilState(badgeDetailState);

  const onClickLike = () => {
    axios({
      method: "POST",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/like",
      data: {
        userSeq: "11", // 고쳐야 합니다.
        nftSeq: "5",
      },
    }).then(function (res) {
      setLikeBadge({ ...likeBadge, isLike: true });
      message.success("좋아요 되었습니다.");
    });
  };

  const onClickDislike = () => {
    axios({
      method: "DELETE",
      url: "http://j6a105.p.ssafy.io:8080/api/nft/unlike",
      data: {
        userSeq: "11", // 고쳐야 합니다.
        nftSeq: "5",
      },
    }).then(function (res) {
      setLikeBadge({ ...likeBadge, isLike: false });
      message.error("좋아요가 취소되었습니다.");
    });
  };

  return (
    <ImgDiv>
      <UserBackgroundImg src="https://picsum.photos/250/250"></UserBackgroundImg>
      <UserImg src="https://picsum.photos/250/250"></UserImg>
      <BadgeList>
        {isLike === true ? (
          <div onClick={onClickDislike}>
            <Badge type="like" liked={true}></Badge>
          </div>
        ) : (
          <div onClick={onClickLike}>
            <Badge type="like"></Badge>
          </div>
        )}
      </BadgeList>
    </ImgDiv>
  );
};