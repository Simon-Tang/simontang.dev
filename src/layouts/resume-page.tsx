import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';

import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { ResumeSheet } from 'src/components/documents/resume/resume.components';
import {
  RHeaderContactLinkHighlight,
  RExperienceListItemLink,
  RExperienceListWrapper,
  RExperienceListItem,
} from 'src/components/documents/resume/resume.styles';
import { BasePageProps } from 'src/layouts/page-content';

const resumeExperienceRendererOptions: Options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (node, children) => (
      <RExperienceListWrapper>
        {children}
      </RExperienceListWrapper>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <RExperienceListItem>{children}</RExperienceListItem>
    ),
    [BLOCKS.PARAGRAPH]: (node, children) => children,
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = node.data.uri;
      return (
        <RExperienceListItemLink href={uri}>
          {children}
        </RExperienceListItemLink>
      );
    },
  },
};

type ResumePageExperience = {
  company: string;
  companyUrl: string;
  position: string;
  dateRange: string;
  experienceDescription?: { json: Document };
}

type ResumePageProps = BasePageProps & {
  pageContext: {
    name: string;
    subtitle: string;
    gitHub: string;
    linkedIn: string;
    email: string;
    website: string;
    experienceCaption: string;
    experiences: Array<ResumePageExperience>;
    educationSchool: string;
    educationRange: string;
    educationDegree: string;
    interests: string[];
  }
};

class ResumePage extends Component<ResumePageProps> {
  public render() {
    const {
      name,
      subtitle,
      experienceCaption,
      experiences,
      educationSchool,
      educationRange,
      educationDegree,
      interests,
    } = this.props.pageContext;

    const experiencesConverted = experiences.map(e => {
      const { company, companyUrl, position, experienceDescription, dateRange } = e;
      const description = this.renderDescription(experienceDescription)
      return {
        company: {
          name: company,
          href: companyUrl,
        },
        position: {
          title: position,
          range: dateRange,
          description,
        },
      }
    })

    return (
      <>
        <Helmet>
          <title>Resume</title>
        </Helmet>
        <ResumeSheet
          name={name}
          subtitle={subtitle}
          contactLinks={this.createContactLinks()}
          experienceCaption={experienceCaption}
          experience={experiencesConverted}
          education={{
            school: educationSchool,
            range: educationRange,
            degree: educationDegree,
            subitems: [
              { heading: 'Interests', points: interests }
            ]
          }}
        />
      </>
    );
  }

  private renderDescription(description?: { json: Document }) {
    if (!description || !description.json) return undefined;
    return documentToReactComponents(
      description.json,
      resumeExperienceRendererOptions,
    )
  }

  private createContactLinks() {
    const { gitHub, linkedIn, email, website } = this.props.pageContext;

    const gitHubUser = gitHub.match(/github\.com\/([\w\-]*)\/?/)![1];
    const linkedInUser = linkedIn.match(/linkedin\.com\/in\/([\w\-]*)\/?/)![1];
    
    let w = website.replace(/https?:\/\//, '').replace(/www\./, '');
    let [wHost, ...wPaths] = w.split('/');
    const wPath = '/' + wPaths.join('/');

    return [
      {
        icon: faGithub,
        href: gitHub,
        print: <>//github.com/<RHeaderContactLinkHighlight>{gitHubUser}</RHeaderContactLinkHighlight></>,
        screen: gitHubUser,
      },
      {
        icon: faLinkedin,
        href: linkedIn,
        print: <>//linkedin.com/in/<RHeaderContactLinkHighlight>{linkedInUser}</RHeaderContactLinkHighlight></>,
        screen: linkedInUser,
      },
      {
        icon: faGlobe,
        href: website,
        print: <>//<RHeaderContactLinkHighlight>{wHost}</RHeaderContactLinkHighlight>{wPath}</>,
        screen: wHost,
      },
      {
        icon: faEnvelope,
        href: `mailto:${email}`,
        screen: email,
      },
    ];
  }
}
export default ResumePage;
