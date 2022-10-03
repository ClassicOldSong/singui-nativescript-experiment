import { Application } from '@nativescript/core';
import { isAndroid, isIOS } from '@nativescript/core/platform';
import { alert } from '@nativescript/core/ui/dialogs';
import { document } from 'dominative';
import {
  browser,
  text,
  attr,
  prop,
  setGlobalCtx,
  useTags,
  build,
  on,
} from 'singui';

setGlobalCtx(browser(document));

const tags = useTags(false);

const app = (target) =>
  build(({ attach }) => {
    const {
      ActionBar,
      NavigationButton,
      ActionItem,
      StackLayout,
      Label,
      Button,
    } = tags;

    ActionBar(() => {
      prop.title = 'Hello SingUI!';
      NavigationButton(() => {
        prop.text = 'Go Back';
        if (isAndroid) prop.android.systemIcon = 'ic_menu_back';
      });
      ActionItem(() => {
        prop.text = 'Alert';
        if (isIOS) prop.ios.position = 'right';
        on('tap', () => {
          alert('This is an alert!');
        });
      });
    });

    StackLayout(() => {
      let count = 0;

      const { ret: setText } = Label(() => {
        prop.className = 'center';
        return text().$textContent(() => `You have clicked ${count} times!`);
      });

      Button(() => {
        attr.class = '-primary';
        text('Tap me!');
        on('tap', () => {
          count += 1;
          setText(count);
        });

        setText();
      });
    });

    attach(target);
  });

Application.run({
  create: () => {
    app(document.documentElement);
    return document;
  },
});
