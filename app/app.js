import * as NSCore from '@nativescript/core';
// eslint-disable-next-line no-duplicate-imports
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
  useElement,
  build,
  on,
} from 'singui';

global.NSCore = NSCore;
global.document = document;

setGlobalCtx(browser());

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

    let frameElement = null;

    ActionBar(() => {
      prop.title = 'Hello World!';
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
      Label(() => {
        prop.className = 'center';
        text('Welcome to SingUI!');
      });
      Button(() => {
        attr.class = '-primary';
        let count = 0;
        const setText = text().$textContent(
          (val) => `You have clicked ${count} times!`
        );
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
