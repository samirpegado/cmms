import {
  Box,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { customLogoPaths, homeUrl } from '../../config';
import { useEffect, useState } from 'react';
import { useBrand } from '../../hooks/useBrand';
import { getLocalizedHomeUrl } from '../../utils/urlPaths';

const LogoWrapper = styled('a')(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        flex-direction: column;
        text-decoration: none;
        align-items: center;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));
interface OwnProps {
  white?: boolean;
  nameFirst?: boolean;
}

function Logo({ white, nameFirst }: OwnProps) {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const width = 60;
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { logo, name: brandName } = useBrand();

  const markSize = (mobile ? 0.7 : 1) * width;
  const mark = (
    <LogoSignWrapper
      sx={
        nameFirst
          ? {
              width: markSize,
              height: markSize,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }
          : undefined
      }
    >
      <img
        src={
          white
            ? '/static/images/logo/logo-white.png'
            : logo.dark || '/static/images/logo/logo.png'
        }
        width={`${markSize}px`}
        height={`${markSize}px`}
        alt={brandName}
        style={{ display: 'block', objectFit: 'contain' }}
      />
    </LogoSignWrapper>
  );
  const name = (
    <Box
      component="span"
      sx={{
        mt: nameFirst ? 0 : 0.5,
        display: nameFirst ? 'flex' : 'inline',
        alignItems: 'center',
        height: nameFirst ? markSize : undefined,
        fontSize: nameFirst ? 28 : 16,
        fontWeight: 700,
        letterSpacing: 0.2,
        lineHeight: 1,
        color: white ? '#fff' : 'text.primary',
        textAlign: 'center'
      }}
    >
      {brandName}
    </Box>
  );

  return (
    <TooltipWrapper title={brandName} arrow>
      <LogoWrapper
        href={getLocalizedHomeUrl('', i18n.language)}
        sx={
          nameFirst
            ? {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                mb: 4
              }
            : undefined
        }
      >
        {mark}
        {name}
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
