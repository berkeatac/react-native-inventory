# Coding Challenge - INV-1

## Description

I have completed the task in the React Native application.

I have created a new branch: `INV-1-berkeatac-code-challenge` and pushed my changes to that branch. It should be set up as the default branch in the repo.

## Decisions

- I have decided to go with an approach, where I'd be using as little external libraries as possible.
  - I haven't used a library for Date formatting, rather created some helper functions to format the date, and do calculations.
  - I haven't used a library for components, such as react-native-paper. Specifically for Card and Chip components. I have created my own as I wanted to have more control over the styling and have them custom.
- Although the task description indicates product name truncation, the designs showed otherwise. I have decided to go with the designs, as I believe that's what the client would want. I have although truncated large field tags in chips.
- Exported & used multiple sized images as assets for optimization.
- Followed a convention for the commit messages, to make it easier to read and understand the changes.
- SafeAreaView was causing an upper padding, so I used a View instead with insets from SafeAreaContext as top padding.

## Could be improved

- Install Roboto font and use in iOS and Android
- Add an animation to ProductItem card expansion
- ProductItem component could also be split into smaller components, depending on the complexity of the app. Although it is a small app, I have decided to keep it as one component.
