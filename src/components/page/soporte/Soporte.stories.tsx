import { ComponentStory, ComponentMeta } from "@storybook/react"

import { SoportePageView } from "./View"

export default {
  title: "Page/Soporte",
  component: SoportePageView,
} as ComponentMeta<typeof SoportePageView>

const Template: ComponentStory<typeof SoportePageView> = (args) => (
  <SoportePageView {...args} />
)

export const Default = Template.bind({})
Default.args = {}
