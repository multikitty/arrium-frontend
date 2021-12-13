import React from "react"
import { Box } from "@mui/material"
import {
  StyledFAQPage,
  StyledFAQPageContent,
  StyledFAQPageContentAccordionDetailsText,
  StyledFAQPageContentAccordionSummaryText,
  StyledFAQPageHeader,
} from "./FAQPage.styled"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import { styled } from "@mui/material/styles"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, {
  AccordionSummaryProps as MuiAccordionSummaryProps,
} from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { rem } from "polished"
import theme from "../../theme"

type AccordionSummaryProps = MuiAccordionSummaryProps & {
  expanded?: boolean
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: `${rem("24px")} ${rem("32px")}`,
  borderRadius: `${rem("20px")} ${rem("20px")} 0 0`,
  "&:before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: rem("32px"),
          height: rem("32px"),
          borderRadius: "50%",
          border: `1px solid ${theme.palette.grey2}`,
        }}
      >
        <ExpandMoreIcon
          sx={{
            fontSize: rem("28px"),
            color: props.expanded ? theme.palette.main : theme.palette.grey6,
          }}
        />
      </Box>
    }
    {...props}
  />
))(() => ({
  backgroundColor: "transparent",
  borderBottom: "none",
  "&:before": {
    display: "none",
    backgroundColor: "none",
  },
  boxShadow: "none",
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

const FAQPage = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1")

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <StyledFAQPage>
      <StyledFAQPageHeader>FAQs</StyledFAQPageHeader>
      <StyledFAQPageContent>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            expanded={expanded === "panel1"}
          >
            <StyledFAQPageContentAccordionSummaryText
              expanded={expanded === "panel1"}
            >
              How it works
            </StyledFAQPageContentAccordionSummaryText>
          </AccordionSummary>
          <AccordionDetails>
            <StyledFAQPageContentAccordionDetailsText>
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections.
            </StyledFAQPageContentAccordionDetailsText>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            aria-controls="panel2-content"
            id="panel2-header"
            expanded={expanded === "panel2"}
          >
            <StyledFAQPageContentAccordionSummaryText
              expanded={expanded === "panel2"}
            >
              How much does it cost?
            </StyledFAQPageContentAccordionSummaryText>
          </AccordionSummary>
          <AccordionDetails>
            <StyledFAQPageContentAccordionDetailsText>
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections.
            </StyledFAQPageContentAccordionDetailsText>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            aria-controls="panel3-content"
            id="panel3-header"
            expanded={expanded === "panel3"}
          >
            <StyledFAQPageContentAccordionSummaryText
              expanded={expanded === "panel3"}
            >
              Maybe this question will be a bit longer, who knows?
            </StyledFAQPageContentAccordionSummaryText>
          </AccordionSummary>
          <AccordionDetails>
            <StyledFAQPageContentAccordionDetailsText>
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections.
            </StyledFAQPageContentAccordionDetailsText>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            aria-controls="panel4-content"
            id="panel4-header"
            expanded={expanded === "panel4"}
          >
            <StyledFAQPageContentAccordionSummaryText
              expanded={expanded === "panel4"}
            >
              Everything you need to know will be on this page?
            </StyledFAQPageContentAccordionSummaryText>
          </AccordionSummary>
          <AccordionDetails>
            <StyledFAQPageContentAccordionDetailsText>
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections.
            </StyledFAQPageContentAccordionDetailsText>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            aria-controls="panel5-content"
            id="panel5-header"
            expanded={expanded === "panel5"}
          >
            <StyledFAQPageContentAccordionSummaryText
              expanded={expanded === "panel5"}
            >
              You can find a lot of information here?
            </StyledFAQPageContentAccordionSummaryText>
          </AccordionSummary>
          <AccordionDetails>
            <StyledFAQPageContentAccordionDetailsText>
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections.
            </StyledFAQPageContentAccordionDetailsText>
          </AccordionDetails>
        </Accordion>
      </StyledFAQPageContent>
    </StyledFAQPage>
  )
}

export default FAQPage
