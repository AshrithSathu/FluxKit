import React, { useState, ReactNode } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface AccordionTriggerProps {
  children: ReactNode;
  onPress: () => void;
  open: boolean;
}

interface AccordionContentProps {
  children: ReactNode;
  open: boolean;
}

interface AccordionItemProps {
  children: ReactNode;
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, onPress, open }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.trigger}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

const AccordionContent: React.FC<AccordionContentProps> = ({ children, open }) => {
  if (!open) return null;
  return <View style={styles.content}>{children}</View>;
};

const AccordionItem: React.FC<AccordionItemProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <View style={styles.item}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === AccordionTrigger) {
          return React.cloneElement(child, { onPress: toggleAccordion, open });
        }
        if (React.isValidElement(child) && child.type === AccordionContent) {
          return React.cloneElement(child, { open });
        }
        return child;
      })}
    </View>
  );
};

const Accordion: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <View>{children}</View>;
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
  trigger: {
    padding: 10,
    backgroundColor: '#ddd',
  },
  content: {
    padding: 10,
    backgroundColor: '#eee',
  },
});

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
