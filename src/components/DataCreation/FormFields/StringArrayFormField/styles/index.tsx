import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import React from "react";
import { SvgIcon, TextField, Tooltip } from "@material-ui/core";
import { Add, Delete, DeleteForever, ExpandMore } from "@material-ui/icons";

const ListFormFieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: auto;

  max-height: 1500px;
  background-color: #fff;
  border-radius: 6px;
  /* padding-right: 15px; */
  /* box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25); */
  border: 1px solid dimgray;
  overflow: hidden;
  /* padding: 10px; */
  color: dimgray;

  margin-bottom: 10%;
`;

const ListFormFieldHeader = styled.div`
  height: 75px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ListFormFieldLabel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  font-size: 18px;
  padding-left: 40px;

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

const ListFormFieldExpandButton = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  /* padding-left: 20px; */
  margin-left: 20px;
  margin-right: 20px;

  .MuiSvgIcon-root {
    fill: dimgray;
  }
`;

const ListFormFieldAddButton = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;

  .MuiSvgIcon-root {
    fill: dimgray;
  }
`;

const ListFormFieldDeleteButton = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: min-content;
  cursor: pointer;
  margin-bottom: 2px;
`;

const ListFormContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListFormItemRoot = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
`;

interface ListFormItemLayoutProps {
  children: React.ReactNode;
}

const expandButtonVariant = {
  initial: { scale: 1, transition: { duration: 0.3 } },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
  expanded: { rotate: 180, transition: { duration: 0.3 } },
};

const addButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
};

const deleteButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
};

const attributeListContainerVariants: Variants = {
  initial: {
    height: 0,
  },
  expanded: {
    height: "auto",
    transition: {
      type: "spring",
      bounce: 1,
      mass: 1,
      velocity: 200,
    },
  },
};

export const ListFormItemLayout = ({ children }: ListFormItemLayoutProps) => {
  return (
    <ListFormItemRoot>
      {children}
      <ListFormFieldDeleteButton
        variants={deleteButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="pressed"
      >
        <SvgIcon component={DeleteForever} />
      </ListFormFieldDeleteButton>
    </ListFormItemRoot>
  );
};

interface ListFormFieldLayoutProps {}

const ListFormFieldLayout = ({}: ListFormFieldLayoutProps) => {
  const [listVisibility, setListVisibility] = React.useState<boolean>(false);

  const toggleListVisibility = () => {
    setListVisibility((prevState) => !prevState);
  };

  return (
    <ListFormFieldRoot>
      <ListFormFieldHeader>
        <ListFormFieldLabel>Label title here</ListFormFieldLabel>

        <ListFormFieldAddButton
          variants={addButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="pressed"
        >
          <SvgIcon component={Add} />
        </ListFormFieldAddButton>
        <ListFormFieldExpandButton
          onClick={toggleListVisibility}
          variants={expandButtonVariant}
          whileHover="hover"
          whileTap="pressed"
          animate={listVisibility ? "expanded" : "initial"}
        >
          <SvgIcon component={ExpandMore} />
        </ListFormFieldExpandButton>
      </ListFormFieldHeader>
      <ListFormContent
        initial="initial"
        variants={attributeListContainerVariants}
        animate={listVisibility ? "expanded" : "initial"}
      >
        <div style={{ padding: "40px", width: "100%" }}>
          <ListFormItemLayout>
            <TextField
              style={{
                minWidth: "75%",
                marginLeft: "20px",
                marginRight: "20px",
              }}
              label="Campo aqui"
            />
          </ListFormItemLayout>
        </div>
      </ListFormContent>
    </ListFormFieldRoot>
  );
};

export default ListFormFieldLayout;
