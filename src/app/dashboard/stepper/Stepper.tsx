import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  styled,
  stepConnectorClasses,
  StepIconProps,
  SvgIconTypeMap,
} from '@mui/material';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useStepper } from './StepperContext';

type DataItem = {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  name: string;
  url?: string;
};

export default function StepperComponent({ data }: { data: DataItem[] }) {
  const { activeStep } = useStepper();
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        background: `#1f4679`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'left',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        background: `#1f4679`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'left',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: '#e4e4e4',
      borderRadius: 1,
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
  }));

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme }) => ({
    backgroundColor: '#e4e4e4',
    zIndex: 1,
    color: '#333333',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          background: `#1f4679`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'left',
          color: '#fff',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
      },
      {
        props: ({ ownerState }) => ownerState.completed,
        style: {
          background: `#1f4679`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'left',
          color: '#fff',
        },
      },
    ],
  }));

  function ColorlibStepIcon(props: StepIconProps & { stepIndex: number }) {
    const { active, completed, className, stepIndex } = props;

    const IconComponent = data[stepIndex]?.icon;

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {IconComponent ? <IconComponent /> : null}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <Stepper
      alternativeLabel
      activeStep={Math.floor(activeStep)}
      connector={<ColorlibConnector />}
      sx={{
        marginBlock: 2,
      }}
    >
      {data.map((label, index) => (
        <Step key={index}>
          <StepLabel
            slots={{
              stepIcon: (props) => (
                <ColorlibStepIcon {...props} stepIndex={index} />
              ),
            }}
          >
            {label.name}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
