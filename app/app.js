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
  useSignal,
  mux,
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
      const count = useSignal(0);

      Label(() => {
        prop.className = 'center';
        text(
          mux`You have tapped ${count} time${() => (count() === 1 ? '' : 's')}`
        );
      });

      Button(() => {
        attr.class = '-primary';
        text('Tap me!');
        on('tap', () => {
          count((i) => i + 1);
        });
      });
    });

    attach(target);
  });

Application.run({
  create: () => {
    document.body.actionBarHidden = false;
    app(document.body);
    return document;
  },
});
