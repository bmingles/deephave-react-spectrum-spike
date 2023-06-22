# React Spectrum Notes

## Dialog Component

https://react-spectrum.adobe.com/react-spectrum/Dialog.html

- Dismissable dialogs (isDismissable={true}) show an X button in top right and hide any other buttons that were explicitly defined. The X is not present when isDismissable==false. This seems to imply if a Dialog has any action buttons, it must also define an explicit cancel button to dismiss without action.
- Action buttons seem to be outside of a form so submit on enter doesn't work
