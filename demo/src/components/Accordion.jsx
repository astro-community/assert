import * as React from 'react'
import * as Accordion from '@reach/accordion';

import "@reach/accordion/styles.css";

export default () => (
	<Accordion.Accordion>
		<Accordion.AccordionItem>
			<h3>
				<Accordion.AccordionButton>Step 1: Do a thing</Accordion.AccordionButton>
			</h3>
			<Accordion.AccordionPanel>
				Here are some detailed instructions about doing a thing. I am very
				complex and probably contain a lot of content, so a user can hide or
				show me by clicking the button above.
			</Accordion.AccordionPanel>
		</Accordion.AccordionItem>
		<Accordion.AccordionItem>
			<h3>
				<Accordion.AccordionButton>Step 2: Do another thing</Accordion.AccordionButton>
			</h3>
			<Accordion.AccordionPanel>
				Here are some detailed instructions about doing yet another thing.
				There are a lot of things someone might want to do, so I am only going
				to talk about doing that other thing. I'll let my fellow accordion
				items go into detail about even more things.
			</Accordion.AccordionPanel>
		</Accordion.AccordionItem>
	</Accordion.Accordion>
)
