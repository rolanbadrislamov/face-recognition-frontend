// Importing necessary modules and components from Chakra UI
import { Switch, useColorMode, FormLabel } from "@chakra-ui/react";

// ThemeToggler component for toggling between light and dark themes
export const ThemeToggler = ({ showLabel = false, ...rest }) => {
  // Destructuring toggleColorMode and colorMode from useColorMode hook
  const { toggleColorMode, colorMode } = useColorMode();

  // JSX structure for theme toggler
  return (
    <>
      {/* If showLabel prop is true, display a label */}
      {showLabel && (
        <FormLabel htmlFor="theme-toggler" mb={0}>
          Enable Dark Theme
        </FormLabel>
      )}
      {/* Switch component for toggling between light and dark themes */}
      <Switch
        id="theme-toggler"
        size="sm"
        // Determine whether the switch is checked based on current color mode
        isChecked={colorMode === "dark"}
        // Enable/disable the switch
        isDisabled={false}
        // Value of the switch
        value={colorMode}
        // Color scheme for the switch
        colorScheme="green"
        // Margin right for spacing
        mr={2}
        // Function to toggle color mode when the switch is changed
        onChange={toggleColorMode}
        // Spread rest props for additional customization
        {...rest}
      />
    </>
  );
};
