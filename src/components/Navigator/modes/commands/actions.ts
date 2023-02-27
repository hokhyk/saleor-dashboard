import { MutationFunction } from '@apollo/client';
import { categoryAddUrl } from '@dashboard/categories/urls';
import { collectionAddUrl } from '@dashboard/collections/urls';
import { customerAddUrl } from '@dashboard/customers/urls';
import { voucherAddUrl } from '@dashboard/discounts/urls';
import { OrderDraftCreateMutation } from '@dashboard/graphql';
import { UseNavigatorResult } from '@dashboard/hooks/useNavigator';
import { permissionGroupAddUrl } from '@dashboard/permissionGroups/urls';
import { productAddUrl } from '@dashboard/products/urls';
import { score } from 'fuzzaldrin';
import { IntlShape } from 'react-intl';

import { QuickSearchActionInput, QuickSearchMode } from '../../types';
import messages from '../messages';
import { sortScores } from '../utils';

const threshold = 0.05;
const maxActions = 5;

interface Command {
  label: string;
  onClick: () => boolean;
}
export function searchInCommands(
  search: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  createOrder: MutationFunction<OrderDraftCreateMutation, {}>,
  setMode: (mode: QuickSearchMode) => void,
): QuickSearchActionInput[] {
  const actions: Command[] = [
    {
      label: intl.formatMessage(messages.createCategory),
      onClick: () => {
        navigate(categoryAddUrl());
        return false;
      },
    },
    {
      label: intl.formatMessage(messages.createCollection),
      onClick: () => {
        navigate(collectionAddUrl());
        return false;
      },
    },
    {
      label: intl.formatMessage(messages.createProduct),
      onClick: () => {
        navigate(productAddUrl());
        return false;
      },
    },
    {
      label: intl.formatMessage(messages.createPermissionGroup),
      onClick: () => {
        navigate(permissionGroupAddUrl);
        return false;
      },
    },
    {
      label: intl.formatMessage(messages.createCustomer),
      onClick: () => {
        navigate(customerAddUrl);
        return false;
      },
    },
    {
      label: intl.formatMessage(messages.createVoucher),
      onClick: () => {
        navigate(voucherAddUrl());
        return false;
      },
    },
    {
      label: intl.formatMessage(messages.createOrder),
      onClick: () => {
        createOrder();
        return false;
      },
    },
    {
      label: intl.formatMessage(messages.helpMode),
      onClick: () => {
        setMode('help');
        return true;
      },
    },
  ];

  return actions.map(action => ({
    label: action.label,
    onClick: action.onClick,
    score: score(action.label, search),
    text: action.label,
    type: 'action',
  }));
}

function getCommandModeActions(
  query: string,
  intl: IntlShape,
  navigate: UseNavigatorResult,
  createOrder: MutationFunction<OrderDraftCreateMutation, {}>,
  setMode: (mode: QuickSearchMode) => void,
): QuickSearchActionInput[] {
  return [...searchInCommands(query, intl, navigate, createOrder, setMode)]
    .filter(action => action.score >= threshold)
    .sort(sortScores)
    .slice(0, maxActions);
}

export default getCommandModeActions;
