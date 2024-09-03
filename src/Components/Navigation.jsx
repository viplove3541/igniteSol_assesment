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
  const navList = [
    {
      title: "FICTION",
      genre: "fiction",
      icon: <Fiction height={30} width={40} />,
    },
    { title: "DRAMA", genre: "drama", icon: <Drama height={30} width={40} /> },
    { title: "HUMOR", genre: "humor", icon: <Humour height={30} width={40} /> },
    {
      title: "POLITICS",
      genre: "politics",
      icon: <Politics height={30} width={40} />,
    },
    {
      title: "PHILOSOPHY",
      genre: "philosophy",
      icon: <Philosophy height={30} width={40} />,
    },
    {
      title: "HISTORY",
      genre: "history",
      icon: <History height={30} width={40} />,
    },
    {
      title: "ADVENTURE",
      genre: "adventure",
      icon: <Adventure height={30} width={40} />,
    },
  ];

  return (
    <Grid container columnSpacing={40} pt={2}>
      {navList.map((item, index) => (
        <Grid item key={index} xs={12} sm={12} md={6} lg={6} xl={6}>
          <Link to="/books" state={{ genre: item.genre }} className="GenreCard">
            <NavButtons text={item.title} icon={item.icon} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Navigation;
