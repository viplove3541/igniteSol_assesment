import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import NavButtons from "../Components/NavButtons";
import { ReactComponent as Fiction } from "../assets/Images/Fiction.svg";
import { ReactComponent as Drama } from "../assets/Images/Drama.svg";
import { ReactComponent as Humour } from "../assets/Images/Humour.svg";
import { ReactComponent as Politics } from "../assets/Images/Politics.svg";
import { ReactComponent as Philosophy } from "../assets/Images/Philosophy.svg";
import { ReactComponent as History } from "../assets/Images/History.svg";
import { ReactComponent as Adventure } from "../assets/Images/Adventure.svg";

const Navigation = () => {
  //create nav array
  const navList = [
    {
      title: "FICTION",
      path: "/books/?topic=fiction&title=FICTION",
      icon: <Fiction height={30} width={40} />,
    },
    {
      title: "DRAMA",
      path: "/books/?topic=drama&title=DRAMA",
      icon: <Drama height={30} width={40} />,
    },
    {
      title: "HUMOR",
      path: "/books/?topic=humor&title=HUMOR",
      icon: <Humour height={30} width={40} />,
    },
    {
      title: "POLITICS",
      path: "/books/?topic=politics&title=POLITICS",
      icon: <Politics height={30} width={40} />,
    },
    {
      title: "PHILOSOPHY",
      path: "/books/?topic=philosophy&title=PHILOSOPHY",
      icon: <Philosophy height={30} width={40} />,
    },
    {
      title: "HISTORY",
      path: "/books/?topic=history&title=HISTORY",
      icon: <History height={30} width={40} />,
    },
    {
      title: "ADVENTURE",
      path: "/books/?topic=adventure&title=ADVENTURE",
      icon: <Adventure height={30} width={40} />,
    },
  ];
  return (
    <Grid container columnSpacing={40} pt={2}>
      {navList.map((li, index) => {
        return (
          <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Link to={li.path} param={"sdasdad"} className="GenreCard">
              <NavButtons text={li.title} icon={li.icon}></NavButtons>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Navigation;
