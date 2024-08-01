import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/Accordion';


const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accordionContainer}>
      <ScrollView>
        <Accordion>
          <AccordionItem>
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>
              <Text>Content for section 1</Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>
              <Text>Content for section 2</Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTrigger>Section 3</AccordionTrigger>
            <AccordionContent>
              <Text>Content for section 3</Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accordionContainer: {
    top: 50,
  },
});

export default App;
