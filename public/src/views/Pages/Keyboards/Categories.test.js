import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import Categories from './Categories'
// in your test:
const renderer = new ShallowRenderer();
renderer.render(<Categories />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
   
        <Card className="tablecss" >
          <CardHeader className="tablecss" style={{ textAlign: 'center', fontSize: '20px', fontWeight: '600' }}>
            Keyboards List 
            {/* <style:"margin-left: 5672% !important"> */}
           <>
            <AddKeyboard/>
              </>
          </CardHeader>
          <CardBody>
            <Datatable/>
          </CardBody>
        </Card>
]);