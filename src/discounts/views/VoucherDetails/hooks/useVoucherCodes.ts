import useListSettings from "@dashboard/hooks/useListSettings";
import { ListViews } from "@dashboard/types";
import { useState } from "react";

import { getVoucherCodesToDisplay } from "../utils";
import { useVoucherCodesClient } from "./useVoucherCodesClient";
import { useVoucherCodesRowSelection } from "./useVoucherCodesRowSelection";
import { useVoucherCodesServer } from "./useVoucherCodesServer";

export const useVoucherCodes = ({ id }: { id: string }) => {
  const {
    settings: voucherCodesSettings,
    updateListSettings: updateVoucherCodesListSettings,
  } = useListSettings(ListViews.VOUCHER_CODES);

  const [isServerPagination, setIsServerPagination] = useState(true);

  const {
    addedVoucherCodes,
    clientVoucherCodes,
    clientVoucherCodesPagination,
    freeSlotsInClientPagianationPage,
    handleAddVoucherCode,
    handleGenerateMultipleCodes,
    handleDeleteAddedVoucherCodes,
    hasClientPaginationNextPage,
    hasClientPaginationPrevPage,
    onSettingsChange,
  } = useVoucherCodesClient(voucherCodesSettings, () => {
    clearRowSelection();
    setIsServerPagination(false);
  });

  const {
    freeSlotsInServerPagianationPage,
    hasServerPaginationNextPage,
    hasServerPaginationPrevPage,
    serverVoucherCodesPagination,
    serverVoucherCodes,
    voucherCodesLoading,
    voucherCodesRefetch,
  } = useVoucherCodesServer({
    id,
    settings: voucherCodesSettings,
    isServerPagination,
    paginationState: {
      first:
        !isServerPagination && freeSlotsInClientPagianationPage > 0
          ? freeSlotsInClientPagianationPage
          : voucherCodesSettings.rowNumber,
    },
  });

  const voucherCodes = getVoucherCodesToDisplay({
    clientVoucherCodes,
    freeSlotsInClientPagianationPage,
    hasClientPaginationNextPage,
    freeSlotsInServerPagianationPage,
    hasServerPaginationPrevPage,
    isServerPagination,
    serverVoucherCodes,
  });

  const voucherCodesPagination = isServerPagination
    ? serverVoucherCodesPagination
    : clientVoucherCodesPagination;

  const {
    selectedVoucherCodesIds,
    handleSetSelectedVoucherCodesIds,
    clearRowSelection,
  } = useVoucherCodesRowSelection(voucherCodes);

  const handleDeleteVoucherCodes = () => {
    clearRowSelection();
    handleDeleteAddedVoucherCodes(selectedVoucherCodesIds);
  };

  const handleLoadNextPage = () => {
    clearRowSelection();
    if (!hasClientPaginationNextPage) {
      setIsServerPagination(true);
    }

    if (isServerPagination) {
      serverVoucherCodesPagination.loadNextPage();
    } else if (!isServerPagination && freeSlotsInClientPagianationPage > 0) {
      serverVoucherCodesPagination.loadNextPage();
    }

    clientVoucherCodesPagination.loadNextPage();
  };

  const handleLoadPrevousPage = () => {
    clearRowSelection();
    if (!hasServerPaginationPrevPage) {
      setIsServerPagination(false);
    }

    if (isServerPagination && hasServerPaginationPrevPage) {
      serverVoucherCodesPagination.loadPreviousPage();
    }

    clientVoucherCodesPagination.loadPreviousPage();
  };

  const calculateHasNextPage = () => {
    // In case when client voucher codes takes all slots
    // on page and there are some server voucher codes to display
    if (
      !isServerPagination &&
      !hasClientPaginationNextPage &&
      freeSlotsInClientPagianationPage === 0 &&
      serverVoucherCodes.length > 0
    ) {
      return true;
    }

    return hasClientPaginationNextPage || hasServerPaginationNextPage;
  };

  const calculateHasPrevPage = () => {
    if (isServerPagination) {
      return hasServerPaginationPrevPage || hasClientPaginationPrevPage;
    }

    return hasClientPaginationPrevPage;
  };

  return {
    voucherCodes,
    addedVoucherCodes,
    voucherCodesLoading,
    voucherCodesPagination: {
      ...voucherCodesPagination,
      pageInfo: {
        ...voucherCodesPagination.pageInfo,
        hasNextPage: calculateHasNextPage(),
        hasPreviousPage: calculateHasPrevPage(),
      },
      loadNextPage: handleLoadNextPage,
      loadPreviousPage: handleLoadPrevousPage,
    },
    voucherCodesRefetch,
    voucherCodesSettings,
    updateVoucherCodesListSettings: (key: any, value: any) => {
      updateVoucherCodesListSettings(key, value);
      onSettingsChange(key, value);
    },
    selectedVoucherCodesIds,
    handleSetSelectedVoucherCodesIds,
    handleAddVoucherCode,
    handleGenerateMultipleCodes,
    handleDeleteVoucherCodes,
  };
};
