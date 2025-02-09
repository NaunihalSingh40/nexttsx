/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import useStyles from "./style";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import Radio from "@/components/common/radio";
import Checkbox from "@/components/common/checkbox";
import { createCustomizationAndGroupMapping } from "@/components/application/productlist/product-details/utils";

// Define Types for Props
interface ProductPayload {
  item_details: {
    tags: Array<{ code: string; list: Array<{ code: string; value: string }> }>;
  };
  customisation_groups: Array<any>; // Assuming these are groups with a structure you want to format
  customisation_items: Array<any>; // Assuming these are items to be formatted
}

interface CustomizationState {
  [key: string]: {
    id: string;
    name: string;
    seq: number;
    options: Array<any>;
    selected: Array<any>;
    childs: Array<any>;
    isMandatory: boolean;
    type: "Checkbox" | "Radio";
  };
}

interface CustomizationRendererProps {
  productPayload: ProductPayload | null;
  customization_state: CustomizationState;
  setCustomizationState: React.Dispatch<
    React.SetStateAction<CustomizationState>
  >;
  isEditFlow?: boolean;
  setItemOutOfStock: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomizationRenderer: React.FC<CustomizationRendererProps> = (props) => {
  const {
    productPayload,
    customization_state,
    setCustomizationState,
    isEditFlow = false,
    setItemOutOfStock,
  } = props;

  const classes = useStyles();
  const [customizationGroups, setCustomizationGroups] = useState<any[]>([]);
  const [customizations, setCustomizations] = useState<any[]>([]);
  const [customizationToGroupMap, setCustomizationToGroupMap] = useState<{
    [key: string]: any[];
  }>({});

  const formatCustomizationGroups = (customisation_groups: any[]) => {
    return customisation_groups?.map((group) => {
      const configTags =
        group.tags.find((tag: { code: string; }) => tag.code === "config")?.list ?? [];
      const minConfig =
        configTags.find((tag: { code: string; }) => tag.code === "min")?.value ?? "0";
      const maxConfig =
        configTags.find((tag: { code: string; }) => tag.code === "max")?.value ?? "0";
      const inputTypeConfig =
        configTags.find((tag: { code: string; }) => tag.code === "input")?.value ?? "";
      const seqConfig =
        configTags.find((tag: { code: string; }) => tag.code === "seq")?.value ?? "0";

      return {
        id: group.local_id,
        name: group.descriptor.name,
        inputType: inputTypeConfig,
        minQuantity: parseInt(minConfig),
        maxQuantity: parseInt(maxConfig),
        seq: parseInt(seqConfig),
      };
    });
  };

  const formatCustomizations = (customisation_items: any[]) => {
    return customisation_items?.map((customization) => {
      const itemDetails = customization.item_details;
      const parentTag = itemDetails.tags.find((tag: { code: string; }) => tag.code === "parent");
      const vegNonVegTag = itemDetails.tags.find(
        (tag: { code: string; }) => tag.code === "veg_nonveg"
      );
      const isDefaultTag = parentTag?.list.find(
        (tag: { code: string; }) => tag.code === "default"
      );
      const isDefault = isDefaultTag?.value.toLowerCase() === "yes";
      const childTag = itemDetails.tags.find((tag: { code: string; }) => tag.code === "child");
      const childs = childTag?.list.map((item: { value: any; }) => item.value);

      return {
        id: itemDetails.id,
        name: itemDetails.descriptor.name,
        price: itemDetails.price.value,
        inStock: itemDetails.quantity.available.count > 0,
        parent: parentTag
          ? parentTag.list.find((tag: { code: string; }) => tag.code === "id")?.value
          : null,
        child: childTag
          ? childTag.list.find((tag: { code: string; }) => tag.code === "id")?.value
          : null,
        childs: childs?.length > 0 ? childs : null,
        isDefault: isDefault ?? false,
        vegNonVeg: vegNonVegTag ? vegNonVegTag.list[0].code : "",
      };
    });
  };

  const findMinMaxSeq = (customizationGroups: any[]) => {
    let minSeq = Infinity;
    let maxSeq = -Infinity;

    customizationGroups.forEach((group) => {
      const seq = group.seq;
      if (seq < minSeq) {
        minSeq = seq;
      }

      if (seq > maxSeq) {
        maxSeq = seq;
      }
    });

    return { minSeq, maxSeq };
  };

  useEffect(() => {
    if (productPayload) {
      const { customisation_groups, customisation_items } = productPayload;
      const customGroup = productPayload.item_details.tags.find(
        (item) => item.code == "custom_group"
      );
      if (customGroup && customGroup.list.length > 0) {
        setCustomizationGroups(formatCustomizationGroups(customisation_groups));
      } else {
        setCustomizationGroups([]);
      }

      setCustomizations(formatCustomizations(customisation_items));
    }
  }, [productPayload]);

  useEffect(() => {
    const mappings = createCustomizationAndGroupMapping(customizations);
    setCustomizationToGroupMap(mappings.customizationToGroupMap);
  }, [customizationGroups, customizations]);

  useEffect(() => {
    const initializeCustomizationState = () => {
      const minSeq = findMinMaxSeq(customizationGroups).minSeq;
      const firstGroup = customizationGroups.find(
        (group) => group.seq === minSeq
      );
      const customization_state: CustomizationState = { firstGroup };

      const processGroup = (id: string) => {
        const group = customizationGroups.find((item) => item.id === id);
        if (!group) return;
        const groupId = group.id;
        const groupName = group.name;
        const isMandatory = group.minQuantity > 0;

        customization_state[groupId] = {
          id: groupId,
          name: groupName,
          seq: group.seq,
          options: [],
          selected: [],
          childs: [],
          isMandatory,
          type: group.maxQuantity > 1 ? "Checkbox" : "Radio",
        };

        const childCustomizations = customizations.filter(
          (customization) => customization.parent === groupId
        );
        customization_state[groupId].options = childCustomizations;
        customization_state[groupId].selected =
          findSelectedCustomizationForGroup(
            customization_state[groupId],
            childCustomizations
          );

        const childGroups =
          customization_state[groupId].selected[0]?.id !== undefined
            ? customizationToGroupMap[
                customization_state[groupId].selected[0]?.id
              ]
            : [];
        customization_state[groupId].childs = childGroups;

        if (childGroups) {
          for (const childGroup of childGroups) {
            processGroup(childGroup);
          }
        }
      };

      if (firstGroup) {
        processGroup(firstGroup.id);
        setCustomizationState(customization_state);
      }
    };

    if (!isEditFlow) {
      initializeCustomizationState();
    }
  }, [customizationGroups, customizations, customizationToGroupMap]);

  const findSelectedCustomizationForGroup = (
    group: any,
    childCustomizations: any[]
  ) => {
    if (!group.isMandatory) return [];
    let selected_groups = [];
    const defaultCustomization = childCustomizations.filter(
      (customization) => customization.isDefault && customization.inStock
    );

    if (defaultCustomization.length) {
      selected_groups = defaultCustomization;
    } else {
      const x = childCustomizations.find(
        (customization) => customization.inStock
      );
      selected_groups = x ? [x] : [];
    }

    let is_item_out_of_stock = true;
    if (selected_groups.length) is_item_out_of_stock = false;

    setItemOutOfStock(is_item_out_of_stock);
    return selected_groups;
  };

  const processGroup = (
    groupId: string,
    updatedCustomizationState1: CustomizationState,
    selectedGroup: any,
    selectedOption: any
  ) => {
    const currentGroup = customizationGroups.find(
      (item) => item.id === groupId
    );
    if (!currentGroup) return;

    const groupName = currentGroup.name;
    const isMandatory = currentGroup.minQuantity > 0;

    const currentGroupOldState = updatedCustomizationState1[currentGroup.id];

    updatedCustomizationState1[groupId] = {
      id: groupId,
      name: groupName,
      seq: currentGroup.seq,
      options: [],
      selected: [],
      childs: [],
      isMandatory,
      type: "Checkbox",
    };
    updatedCustomizationState1[groupId].options = [];

    const childCustomizations = customizations.filter(
      (customization) => customization.parent === groupId
    );
    updatedCustomizationState1[groupId].options = childCustomizations;

    let childGroups = [];
    if (currentGroup.id === selectedGroup.id) {
      let new_selected_options = [];
      if (
        !isMandatory &&
        currentGroupOldState.selected.find(
          (optn) => optn.id == selectedOption.id
        )
      ) {
        new_selected_options = [...currentGroupOldState["selected"]].filter(
          (item) => item.id != selectedOption.id
        );
        updatedCustomizationState1[groupId].selected = new_selected_options;
      } else {
        if (currentGroup.maxQuantity === 1) {
          childGroups = customizationToGroupMap[selectedOption.id];
          updatedCustomizationState1[groupId].selected = [selectedOption];
        } else {
          if (
            currentGroup.maxQuantity > 1 &&
            currentGroupOldState.selected.length < currentGroup.maxQuantity
          ) {
            new_selected_options = [
              ...currentGroupOldState["selected"],
              selectedOption,
            ];
            updatedCustomizationState1[groupId].selected = new_selected_options;
          } else {
            updatedCustomizationState1[groupId].selected =
              currentGroupOldState.selected;
          }
        }
      }
    } else {
      const groupSelectedOption = currentGroupOldState.selected;
      updatedCustomizationState1[groupId].selected = groupSelectedOption;
      if (groupSelectedOption.length > 0) {
        childGroups = customizationToGroupMap[groupSelectedOption[0].id];
      }
    }

    if (childGroups.length) {
      updatedCustomizationState1[groupId].childs = childGroups;
      for (const childGroup of childGroups) {
        processGroup(
          childGroup,
          updatedCustomizationState1,
          selectedGroup,
          selectedOption
        );
      }
    }
  };

  const handleCustomizationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    group: any,
    selectedOption: any
  ) => {
    const updatedCustomizationState1 = { ...customization_state };

    const groupId = group.id;
    const isSelected = event.target.checked;

    if (group.type === "Checkbox") {
      if (isSelected) {
        updatedCustomizationState1[groupId].selected.push(selectedOption);
      } else {
        updatedCustomizationState1[groupId].selected =
          updatedCustomizationState1[groupId].selected.filter(
            (item) => item.id !== selectedOption.id
          );
      }
    } else if (group.type === "Radio") {
      updatedCustomizationState1[groupId].selected = [selectedOption];
    }

    setCustomizationState(updatedCustomizationState1);

    if (selectedOption.childs) {
      let childGroup = [];
      childGroup = customizationToGroupMap[selectedOption.id];
      if (childGroup.length) {
        updatedCustomizationState1[groupId].childs = childGroup;
        for (const childGroupId of childGroup) {
          processGroup(
            childGroupId,
            updatedCustomizationState1,
            group,
            selectedOption
          );
        }
      }
    }
  };

  const renderCustomizationOption = (option: any, group: any) => {
    return (
      <FormControlLabel
        key={option.id}
        control={
          <Checkbox
            checked={customization_state[group.id]?.selected.some(
              (item) => item.id === option.id
            )}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomizationChange(e, group, option)}
            disabled={!option.inStock}
          />
        }
        label={<Typography>{option.name}</Typography>}
      />
    );
  };

  const renderCustomization = () => {
    return customizationGroups?.map((group) => {
      return (
        <Accordion key={group.id} defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${group.id}-content`}
            id={`panel${group.id}-header`}
          >
            <Typography variant="h6">{group.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {group.type === "Checkbox"
                ? group.options.map((option: any) =>
                    renderCustomizationOption(option, group)
                  )
                 
                : group.options.map((option: { id: any; name: any; }) => (
                    <Radio
                      key={option.id}
                      checked={customization_state[group.id]?.selected.some(
                        (item) => item.id === option.id
                      )}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleCustomizationChange(e, group, option)
                      }
                      label={<Typography>{option.name}</Typography>}
                    />
                  ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return (
    <div className={classes.customizationContainer}>
      {renderCustomization()}
    </div>
  );
};

export default CustomizationRenderer;
