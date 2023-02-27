import CardTitle from '@dashboard/components/CardTitle';
import Skeleton from '@dashboard/components/Skeleton';
import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';

import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import GiftCardUpdateInfoCardContent from './GiftCardUpdateInfoCardContent';
import { giftCardUpdateInfoCardMessages as messages } from './messages';

const GiftCardUpdateInfoCard: React.FC = () => {
  const intl = useIntl();

  const { loading } = useGiftCardDetails();

  return (
    <Card>
      <CardTitle title={intl.formatMessage(messages.title)} />
      <CardContent>{loading ? <Skeleton /> : <GiftCardUpdateInfoCardContent />}</CardContent>
    </Card>
  );
};

export default GiftCardUpdateInfoCard;
