import React, { useContext, useEffect, useState } from "react";
import ContentContainer from "../components/ContentContainer";
import { Button, IconButton, Stack } from "@mui/material";
import TopOptions from "../components/practices/TopOptions";
import PracticeTable from "../components/practices/PracticeTable";
import PracticeCard from "../components/practices/PracticeCard";
import practicesCRUD from "../services/http/practices";
import { LoadingContext } from "../context/LoadingContext";
import { PracticeContextProvider } from "../context/PracticeContext";
import PracticeAlphaTopOptions from "../components/practices/PracticeAlphaTopOptions";
import PracticeAlphaBody from "../components/practices/PracticeAlphaBody";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const Practices = () => {
  const [addPracticeIsOpen, setAddPracticeIsOpen] = useState();
  const [practicesData, setPracticesData] = useState([]);
  const [isShowOnboardingForm, setIsShowOnboardingForm] = useState(false);
  const [practiceId, setPracticeId] = useState();
  const [practiceName, setPracticeName] = useState("");

  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    // setIsLoading(true);
    practicesCRUD
      .getPractices()
      .then((data) => {
        setIsLoading(false);
        setPracticesData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  {
    return isShowOnboardingForm ? (
      <>
        <ContentContainer isBackArrow={true} contentTitle={practiceName}>
          <IconButton
            sx={{ position: "absolute" }}
            onClick={() => setIsShowOnboardingForm(false)}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
          <PracticeAlphaTopOptions
            setIsShowOnboardingForm={(value) => setIsShowOnboardingForm(value)}
          />
          <PracticeAlphaBody
            setPracticeName={(name) => setPracticeName(name)}
            practiceId={practiceId}
          />
        </ContentContainer>
      </>
    ) : (
      <ContentContainer contentTitle={"Practices"}>
        <PracticeContextProvider value={{ practicesData, setPracticesData }}>
          <Stack
            sx={{
              position: { xs: "unset", md: "absolute" },
              right: "0",
              width: { xs: "100%", md: "80%" },
            }}
          >
            <TopOptions
              setIsLoading={setIsLoading}
              addPracticeIsOpen={addPracticeIsOpen}
              setAddPracticeIsOpen={(value) => setAddPracticeIsOpen(value)}
            />
          </Stack>
          <Stack>
            <PracticeTable
              setPracticeId={(value) => setPracticeId(value)}
              setIsShowOnboardingForm={(value) =>
                setIsShowOnboardingForm(value)
              }
              sx={{ display: { xs: "none", sm: "block" } }}
              addPracticeIsOpen={addPracticeIsOpen}
              setAddPracticeIsOpen={(value) => setAddPracticeIsOpen(value)}
            />
            <PracticeCard sx={{ display: { xs: "flex", sm: "none" } }} />
          </Stack>
        </PracticeContextProvider>
      </ContentContainer>
    );
  }
};

export default Practices;
