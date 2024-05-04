import { useState, useEffect } from "react";

import SearchBar from "../components/Searchbar";
import ApplyBox from "../components/ApplyBox";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import GoogleImg from "../assets/logos/google.png";
import Echoimg from "../assets/logos/echo3D.png";
import TDimg from "../assets/logos/TD.png";
import DeloitteImg from "../assets/logos/deloitte.png";
import KPMGimg from "../assets/logos/kpmg.png";
// mui
import Box from "@mui/material/Box";

// mui
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ApplyJobs() {
  const [value, setValue] = useState(0);
  const [inputText, setInputText] = useState("");
  const postings = [
    {
      key: 1,
      company: "Google",
      role: "Student Researcher",
      description:
        "The Student Researcher Program’s primary objective is to foster academic collaborations with students through research at Google. Join us for a paid Student Researcher position that offers the opportunity to work directly with Google research scientists and developers on cutting-edge research projects. The Student Researcher Program offers more opportunities for research students to work on critical research projects at Google in a less structured way. The program allows for opportunities beyond the limitations of our traditional internship program on aspects such as duration, time commitment, and working location (with options for on-site or remote). The topics student researchers work on tend to be open-ended and exploratory, and don't always have a clear deliverable like a traditional internship would.",
      img: GoogleImg,
      click:
        "https://www.google.com/about/careers/applications/jobs/results/123267084596454086-student-researcher-bsms-wintersummer-2024?target_level=INTERN_AND_APPRENTICE",
    },
    {
      key: 3,
      company: "TD",
      role: "Senior Product Manager - Commercial Cards",
      description:
        "The Senior Product Manager – Commercial Cards will be responsible for driving competitive and resilient products & features for the Commercial Card suite of solution.   The candidate must have deep industry experience, working at multiple issuers as a card and payment industry subject matter expert. This position is available to be based within the TD Bank footprint, Maine to Florida. The Senior Product Manager oversees the end to end management of assigned products, services and programs including features, benefits and characteristics that meet customer needs and are priced to meet the Bank's profit and loss objectives. The Senior Product Manager is accountable for building value proposition the business wants to deliver and mapping the investments required to get there. This role is responsible for formulating strategy, policy and overall direction of the identified product or suite of products portfolio.",
      img: TDimg,
      click:
        "https://td.wd3.myworkdayjobs.com/en-US/TD_Bank_Careers/details/Senior-Product-Manager---Commercial-Cards_R_1340437?jobFamilyGroup=de7696529635014387912bb50704fbab",
    },
    {
      key: 4,
      company: "Deloitte",
      role: "Analyst Intern",
      description:
        "As an Analyst Intern, you will work in a fast growing and challenging environment with like-minded people who are eminent in their respective technical fields such Data Mining, Machine Learning, Data Visualization, and much more.  You will experience the growth of a practice totally dedicated to the art and science of using data to help clients drive business decisions related to mergers and acquisitions as well as value creation / business improvement initiatives. You will be able to expand your professional development while working with high profile clients who need analytics support for their top priority initiatives and strategies. You will develop advanced analytical solutions within our analytics team, across service lines at Deloitte, and with clients in multiple industries.",
      img: DeloitteImg,
      click:
        "https://careers.deloitte.ca/job/Toronto%2C-Ontario%2C-Canada-Analyst-Intern%2C-M&A-Analytic-Insights%2C-Financial-Advisory-Fall-2024-Toronto-ON/1152745800/",
    },
    {
      key: 5,
      company: "KPMG",
      role: "Manager, Trade & Customs",
      description:
        "KPMG’s Trade & Customs team works to be a client’s first choice. With increasing globalization, companies have a growing need for analysis and advice on the subject of customs legislation. Our practice provides clients with global solutions for cutting trade and customs costs and for reducing the effects of barriers to international trade. You will deal with in-depth compliance issues, customs valuation (including related party pricing), origin verification, duty relief applications, defend customs audits, and provide support to all other indirect and direct tax practitioners within Canada and around the world. As part of our team, you will participate in providing trade and customs advisory services to clients of KPMG and be part of a Global Trade & Customs team consisting of over 800 professionals assisting clients in over 80 countries.",
      img: KPMGimg,
      click: "https://careers.kpmg.ca/students/jobs/23231?lang=en-us",
    },
    {
      key: 2,
      company: "Echo3D",
      role: "Director of Sales",
      description:
        "As a Director of, you will work on driving the company's sales and business development efforts. Primarily by drafting and executing business plans and strategies for the company and by securing contracts with new clients.",
      img: Echoimg,
      click: "https://wellfound.com/jobs/2829607-director-of-sales-saas",
    },
  ];

  let inputHandler = (event) => {
    // convert input text to lower case
    let lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredPostings = postings?.filter((posting) => {
    let name = `${posting.company}`;
    if (inputText === "") {
      return posting;
    } else
      return (
        name.toLowerCase().includes(inputText) ||
        posting.description?.toLowerCase().includes(inputText) ||
        posting.role?.toLowerCase().includes(inputText)
      );
  });

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Header title="Apply to Jobs" subtitle="Look for your dream job" />
      </div>
      <div className="apply_container">
        <Box sx={{ width: "100%" }}>
          <TabPanel value={value} index={0}>
            <div>
              <SearchBar postings={postings} inputHandler={inputHandler} />
              {filteredPostings?.map((posting) => (
                <ApplyBox
                  key={posting._id}
                  id={posting._id}
                  name={`${posting.company}`}
                  role={posting.role}
                  description={posting.description}
                  img={posting.img}
                  click={posting.click}
                />
              ))}
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
