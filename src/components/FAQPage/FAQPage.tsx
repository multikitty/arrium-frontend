import React, { useEffect } from "react"
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
import theme from "@/theme"
import { useMutation } from "react-query"
import { FAQResult, FAQresultData, FAQVariables } from "@/lib/interfaces/faq"
import { faqInfo } from "@/agent/faq"
import { PageProps } from "@/lib/interfaces/common"
import { useStore } from "@/store"

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

const AccordionSummary = styled(
  (props: AccordionSummaryProps) => (
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
  ),
  { shouldForwardProp: p => p !== "expanded" }
)(() => ({
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

const FAQPage: React.FC<PageProps> = ({ country_code }) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1")
  const [faqQuestions, setFaqQuestions] = React.useState<string[]>([])
  const { userStore } = useStore()
  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  const { mutate } = useMutation<FAQResult, Error, FAQVariables>(
    faqInfo
  )

  const getFAQquestions = () => {
    mutate(
      {
        language: `en-${country_code}`
      },
      {
        onSuccess({ result, success, message }) {
          if (!success) {
            setFaqQuestions(result)
          }
        },
        onError(error) {
          console.log("error", error)
        },
      }
    )
  }

  useEffect(() => {
    getFAQquestions()
  }, [])

  return (
    <StyledFAQPage>
      <StyledFAQPageHeader>FAQs</StyledFAQPageHeader>
      <StyledFAQPageContent>
        {faqQuestions.map((item: any, index: number) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === `panel1${index}`}
              onChange={handleChange(`panel1${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel1${index}-content`}
                id={`panel1${index}-header`}
                expanded={expanded === `panel1${index}`}
              >
                <StyledFAQPageContentAccordionSummaryText
                  $expanded={expanded === `panel1${index}`}
                >
                  {item.title}
                </StyledFAQPageContentAccordionSummaryText>
              </AccordionSummary>
              <AccordionDetails>
                <StyledFAQPageContentAccordionDetailsText dangerouslySetInnerHTML={{ __html: item.body }} />
              </AccordionDetails>
            </Accordion>
          )
        })}
      </StyledFAQPageContent>
    </StyledFAQPage>
  )
}

export default FAQPage
