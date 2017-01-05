import test from 'ava'
import React from 'react'
import { shallow, mount } from 'enzyme';

import Sticker from '../../src/Sticker'

test('shallow', t => {
  const wrapper = shallow(<Sticker />)
  t.is(wrapper.contains(<span>ThallyBox</span>), true)
})


