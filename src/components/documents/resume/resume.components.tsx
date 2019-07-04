import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

import {
  RAddressLink,
  RColumn,
  RHeaderName,
  RHeaderSubtitle,
  RHeaderWrapper,
  RMainWrapper,
  RH1,
  RH2,
  RH3,
  RP,
  RExperienceCaptionP,
  RExperienceTitleWrapper,
  RExperienceTitleLink,
  RHDivider,
  REducationItemWrapper,
  REducationListItem,
  ResumeSheetWrapper,
} from './resume.styles';
import {
  RAddressProps,
  RHeaderProps,
  RMainProps,
  RExperience,
  ResumeProps,
} from './resume.types';

const RAddress = ({ icon, href, children }: RAddressProps) => {
  return (
    <RAddressLink href={href}>
      <FontAwesomeIcon icon={icon} fixedWidth />
      {children}
    </RAddressLink>
  );
};

const RExperienceTitle = ({ company, position }: RExperience) => (
  <RExperienceTitleWrapper>
    <RExperienceTitleLink href={company.href}>
      {company.name}
    </RExperienceTitleLink>
    <RHDivider />
    <span className='position'>{position.title}</span>
    <span className='range'>{position.range}</span>
  </RExperienceTitleWrapper>
);

const RHeader = ({ name, subtitle, contactLinks }: RHeaderProps) => {
  return (
    <RHeaderWrapper>
      <RColumn split={0.555}>
        <RHeaderName>{name}</RHeaderName>
        <RHeaderSubtitle>{subtitle}</RHeaderSubtitle>
      </RColumn>
      <RColumn split={0.445}>
        {contactLinks.map(c => (
          <RAddress key={c.href} icon={c.icon} href={c.href}>
            {c.print && <span className='print'>{c.print}</span>}
            <span className={c.print ? 'screen' : undefined}>{c.screen}</span>
          </RAddress>
        ))}
      </RColumn>
    </RHeaderWrapper>
  );
};

const RMain = ({
  experience,
  experienceCaption,
  education: { degree, range, school, subitems },
}: RMainProps) => (
  <RMainWrapper>
    <section>
      <RH1 style={{ marginTop: 0 }}>Work Experience</RH1>
      {experienceCaption && (
        <RExperienceCaptionP>{experienceCaption}</RExperienceCaptionP>
      )}
      {experience.map(({ company, position }) => (
        <React.Fragment key={company.name + '_' + position.range}>
          <RExperienceTitle company={company} position={position} />
          {position.description}
        </React.Fragment>
      ))}
    </section>

    <section>
      <RH1>Education</RH1>
      <RH2>
        {school} <RHDivider /> {range}
      </RH2>
      <RP>{degree}</RP>
      {subitems.map(({ heading, points }) => (
        <REducationItemWrapper key={heading}>
          {/* To-do: grid? */}
          <RH3 style={{ minWidth: '4rem' }}>{heading}</RH3>
          <div>
            {points.map(p => (
              <REducationListItem key={p}>{p}</REducationListItem>
            ))}
          </div>
        </REducationItemWrapper>
      ))}
    </section>
  </RMainWrapper>
);

export const ResumeSheet = ({
  name,
  subtitle,
  contactLinks,
  education,
  experience,
  experienceCaption,
}: ResumeProps) => (
  <ResumeSheetWrapper overflowY={true}>
    <RHeader name={name} subtitle={subtitle} contactLinks={contactLinks} />
    <RMain
      education={education}
      experience={experience}
      experienceCaption={experienceCaption}
    />
  </ResumeSheetWrapper>
);
