import {
  motion,
  useAnimation,
  useViewportScroll,
  Variants,
} from "framer-motion";
import { useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import Search from "../Routes/Search";
import logo from "./Icons/Logo.png";


const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 130px;
  position: fixed;
  top: 0;
  background-color: ${props => props.theme.gray};
  font-size: 14px;
  padding: 20px 4%;
  color: white;
  z-index: 1;
  /* @media screen and (max-width: 930px) {
    height: 45px;
  } */
`;

const Col = styled.div`
  width: 1200px;
  min-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

const Logo = styled(motion.div)`
  margin-left: 30px;
  width: 95px;
  height: 105px;
  background: url(${logo});
  /* fill: ${(props) => props.theme.red}; */
  transform: scale(1.2);
  /* @media screen and (max-width: 1130px) {
    margin-right: 22px;
  }
  @media screen and (max-width: 930px) {
    transform: scale(0.8);
  } */

  /* have to set min-width */
  /* @media screen and (max-width: 850px) {
    } */
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 60px;
  font-size: 28px;
  font-weight: 400;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  /* @media screen and (max-width: 1130px) {
    font-size: 14px;
  }
  @media screen and (max-width: 930px) {
    font-size: 12px;
    margin-right: 14px;
  } */
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -18px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.white.darker};
  left: 0;
  right: 0;
  margin: 0 auto;
  /* @media screen and (max-width: 930px) {
    transform: scale(0.5);
  } */
`;

const logoVariants: Variants = {
  initial: {
    opacity: 1,
  },
  active: {
    opacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
      duration: 1.5,
    },
  },
};

//   const navVariant: Variants = {
//     top: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
//     scroll: { backgroundColor: "rgba(0, 0, 0, 1)" },
//   };

function Header() {
  const homeMatch = useMatch("/");
  const uploadMatch = useMatch("upload");
  const deleteMatch = useMatch("delete");
  const searchMatch = useMatch("search");
  // const navAnimation = useAnimation();
  // const { scrollY } = useViewportScroll();
  // useEffect(() => {
  //   scrollY.onChange(() => {
  //     if (scrollY.get() > 20) {
  //       navAnimation.start("scroll");
  //     } else {
  //       navAnimation.start("top");
  //     }
  //   });
  // }, [scrollY, navAnimation]);
  return (
    <Nav initial="top">
      <Col>
        <Logo
          variants={logoVariants}
          animate="initial"
          whileHover="active"
        />
        {/* change to menu toggle under 850px. */}
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="upload">
              Upload {uploadMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="delete">
              Delete {deleteMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="search">
              Search {searchMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

export default Header;
