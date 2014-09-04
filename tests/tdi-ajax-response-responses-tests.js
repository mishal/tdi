module( 'TDI.Ajax.Response' );
	
	asyncTest( 'TDI.Ajax.Response: events and XML', function() {
		expect(163);
		
		// bind the events
			$(document)
				.bind( 'tdi:ajax:beforeReload', function( evt, data ) {
					return false;
				} )
				.bind( 'tdi:ajax:beforeRedirect', function( evt, data ) {
					equals( data.href, 'http://google.com', 'Redirect: href' );
					return false;
				} )
				.bind( 'tdi:ajax:updatesDone', function( evt, data ) {
					// check the API data
						var u1 = data.updates[0],
							u2 = data.updates[1],
							u3 = data.updates[2],
							u4 = data.updates[3],
							u5 = data.updates[4],
							u6 = data.updates[5],
							u7 = data.updates[6],
							u8 = data.updates[7],
							u9 = data.updates[8],
							u10 = data.updates[9];

						equals( u1.target_id, 'update-default', 'Update1: target_id' );
						equals( u1.target.attr( 'id' ), 'update-default', 'Update1: target' );
						equals( u1.content, 'Update default', 'Update1: content' );

						equals( u2.target_id, 'update-replace', 'Update2: target_id' );
						equals( u2.target.attr( 'id' ), 'update-replace', 'Update2: target' );
						equals( u2.replace, 'true', 'Update2: replace' );
						equals( u2.content, '<div id="update-replaced">Update replace</div>', 'Update2: content' );

						equals( u3.target_id, 'update-append', 'Update3: target_id' );
						equals( u3.target.attr( 'id' ), 'update-append', 'Update3: target' );
						equals( u3.append, 'true', 'Update3: append' );
						equals( u3.content, 'Update append', 'Update3: content' );

						equals( u4.target_id, 'update-prepend', 'Update4: target_id' );
						equals( u4.target.attr( 'id' ), 'update-prepend', 'Update4: target' );
						equals( u4.prepend, 'true', 'Update4: prepend' );
						equals( u4.content, 'Update prepend', 'Update4: content' );

						equals( u5.target_id, 'update-add-class', 'Update5: target_id' );
						equals( u5.target.attr( 'id' ), 'update-add-class', 'Update5: target' );
						equals( u5.class_add, 'cls-add', 'Update5: class add' );
						equals( u5.content, 'Update add class', 'Update5: content' );

						equals( u6.target_id, 'update-remove-class', 'Update6: target_id' );
						equals( u6.target.attr( 'id' ), 'update-remove-class', 'Update6: target' );
						equals( u6.class_remove, 'cls-remove', 'Update6: class remove' );
						equals( u6.content, '', 'Update6: content' );

						equals( u7.selector, '#update-multiple-1, #update-multiple-2, .update-multiple', 'Update7: selector' );
						equals( u7.target.length, 4, 'Update7: targets' );
						equals( u7.class_remove, 'cls-remove', 'Update7: class remove' );
						equals( u7.class_add, 'cls-add', 'Update7: class add' );
						equals( u7.content, 'Update multiple', 'Update7: content' );

						equals( u8.selector, '.update-multiple-replace', 'Update8: selector' );
						equals( u8.target.length, 2, 'Update8: targets' );
						equals( u8.content, '<div class="update-multiple-replaced">Update multiple replace</div>', 'Update8: content' );

						equals( u9.selector, '.update-multiple-append', 'Update9: selector' );
						equals( u9.target.length, 2, 'Update9: targets' );
						equals( u9.content, 'Update append' );

						equals( u10.selector, '.update-multiple-prepend', 'Update10: selector' );
						equals( u10.target.length, 2, 'Update10: targets' );
						equals( u10.content, 'Update prepend' );

					// check the markup
						equals( $( '#update-default' ).text(), 'Update default', 'The target was updated and has the correct contents.' );
						equals( $( '#update-replace' ).length, 0, 'The target does not exist, it was replaced.' );
						equals( $( '#update-replaced' ).length, 1, 'A new element `update-replace` replaced the former update target.' );
						equals( $( '#update-replaced' ).text(), 'Update replace', 'The new element has the correct contents.' );
						equals( $( '#update-append' ).text(), 'This is the first text.Update append', 'The target was updated and new contents were appended at the end.' );
						equals( $( '#update-prepend' ).text(), 'Update prependThis is the last text.', 'The target was updated and new contents were prepended at the beginning.' );
						ok( $( '#update-add-class' ).hasClass( 'cls-add' ), 'A new class name was added to the target.' );
						equals( $( '#update-add-class' ).text(), 'Update add class' );
						ok( !$( '#update-remove-class' ).hasClass( 'cls-remove' ), 'A class name was removed from the target.' );
						equals( $( '#update-multiple-1' ).text(), 'Update multiple', 'The multiple target 1 was updated and has the correct contents.' );
						equals( $( '#update-multiple-2' ).text(), 'Update multiple', 'The multiple target 2 was updated and has the correct contents.' );
						equals( $( '.update-multiple' ).eq(0).text(), 'Update multiple', 'The multiple target 3 was updated and has the correct contents.' );
						equals( $( '.update-multiple' ).eq(1).text(), 'Update multiple', 'The multiple target 4 was updated and has the correct contents.' );
						ok( $( '#update-multiple-1' ).hasClass( 'cls-add' ), 'A new class name was added to the multiple target 1' );
						ok( $( '#update-multiple-2' ).hasClass( 'cls-add' ), 'A new class name was added to the multiple target 2' );
						ok( $( '.update-multiple' ).eq(0).hasClass( 'cls-add' ), 'A new class name was added to the multiple target 3' );
						ok( $( '.update-multiple' ).eq(1).hasClass( 'cls-add' ), 'A new class name was added to the multiple target 4' );
						ok( !$( '#update-multiple-1' ).hasClass( 'cls-remove' ), 'A class name was removed from the multiple target 1' );
						ok( !$( '#update-multiple-2' ).hasClass( 'cls-remove' ), 'A class name was removed from the multiple target 2' );
						ok( !$( '.update-multiple' ).eq(0).hasClass( 'cls-remove' ), 'A class name was removed from the multiple target 3' );
						ok( !$( '.update-multiple' ).eq(1).hasClass( 'cls-remove' ), 'A class name was removed from the multiple target 4' );
						equals( $( '.update-multiple-replace' ).length, 0, 'The targets do not exist, they were replaced.' );
						equals( $( '.update-multiple-replaced' ).length, 2, 'New elements `update-multiple-replaced` replaced the former update targets.' );
						equals( $( '.update-multiple-replaced' ).eq(0).text(), 'Update multiple replace', 'The new element has the correct contents.' );
						equals( $( '.update-multiple-replaced' ).eq(1).text(), 'Update multiple replace', 'The new element has the correct contents.' );
						equals( $( '#update-multiple-7' ).text(), 'This is the first text.Update append', 'The multiple target was updated and new contents were appended at the end.' );
						equals( $( '#update-multiple-8' ).text(), 'This is the first text.Update append', 'The multiple target was updated and new contents were appended at the end.' );
						equals( $( '#update-multiple-9' ).text(), 'Update prependThis is the last text.', 'The multiple target was updated and new contents were prepended at the beginning.' );
						equals( $( '#update-multiple-10' ).text(), 'Update prependThis is the last text.', 'The multiple target was updated and new contents were prepended at the beginning.' );
				} )
				.bind( 'tdi:ajax:insertsDone', function( evt, data ) {
					// check the API data
						var i1 = data.inserts[0],
							i2 = data.inserts[1],
							i3 = data.inserts[2],
							i4 = data.inserts[3],
							i5 = data.inserts[4],
							i6 = data.inserts[5];

						equals( i1.target_id, 'inserts', 'Insert1: target_id' );
						equals( i1.target.attr( 'id' ), 'inserts', 'Insert1: target' );
						equals( i1.content, '<div id="inserted-after-default">Inserted after (default)</div>', 'Insert1: content' );
						equals( i1.position, 'after', 'Insert1: position' );
						equals( i1.inserted_node.attr( 'id' ), 'inserted-after-default', 'Insert1: inserted node' );

						equals( i2.target_id, 'inserts', 'Insert2: target_id' );
						equals( i2.target.attr( 'id' ), 'inserts', 'Insert2: target' );
						equals( i2.content, '<div id="inserted-after">Inserted after</div>', 'Insert2: content' );
						equals( i2.position, 'after', 'Insert2: position' );
						equals( i2.inserted_node.attr( 'id' ), 'inserted-after', 'Insert2: inserted node' );

						equals( i3.target_id, 'inserts', 'Insert3: target_id' );
						equals( i3.target.attr( 'id' ), 'inserts', 'Insert3: target' );
						equals( i3.content, '<div id="inserted-before">Inserted before</div>', 'Insert3: content' );
						equals( i3.position, 'before', 'Insert3: position' );
						equals( i3.inserted_node.attr( 'id' ), 'inserted-before', 'Insert3: inserted node' );

						equals( i4.selector, '.inserts-multiple-default', 'Insert4: selector' );
						equals( i4.target.length, 2, 'Insert4: targets' );
						equals( i4.content, '<div class="inserted-multiple-after-default">Inserted after (default)</div>', 'Insert4: content' );
						equals( i4.position, 'after', 'Insert4: position' );
						equals( i4.inserted_node.length, 2, 'Insert4: inserted nodes' );

						equals( i5.selector, '.inserts-multiple-after', 'Insert5: selector' );
						equals( i5.target.length, 2, 'Insert5: targets' );
						equals( i5.content, '<div class="inserted-multiple-after">Inserted after</div>', 'Insert5: content' );
						equals( i5.position, 'after', 'Insert5: position' );
						equals( i5.inserted_node.length, 2, 'Insert5: inserted nodes' );

						equals( i6.selector, '.inserts-multiple-before', 'Insert6: selector' );
						equals( i6.target.length, 2, 'Insert6: targets' );
						equals( i6.content, '<div class="inserted-multiple-before">Inserted before</div>', 'Insert6: content' );
						equals( i6.position, 'before', 'Insert6: position' );
						equals( i6.inserted_node.length, 2, 'Insert6: inserted nodes' );

					// check the markup
						equals( $( '#inserted-after-default' ).length, 1, 'Inserted after (default)' );
						equals( $( '#inserted-after' ).length, 1, 'Inserted after' );
						equals( $( '#inserted-before' ).length, 1, 'Inserted before' );
						equals( $( '#inserts' ).next( '#inserted-after' ).next( '#inserted-after-default' ).length, 1, 'Inserted after: correct position' );
						equals( $( '#inserts' ).prev( '#inserted-before' ).length, 1, 'Inserted before: correct position' );
						equals( $( '.inserted-multiple-after-default' ).length, 2, 'Inserted multiple after (default)' );
						equals( $( '#inserts-multiple-default-1' ).next( '.inserted-multiple-after-default' ).length, 1, 'Inserted multiple after (default): correct position' );
						equals( $( '#inserts-multiple-default-2' ).next( '.inserted-multiple-after-default' ).length, 1, 'Inserted multiple after (default): correct position' );
						equals( $( '.inserted-multiple-after' ).length, 2, 'Inserted multiple after' );
						equals( $( '#inserts-multiple-after-1' ).next( '.inserted-multiple-after' ).length, 1, 'Inserted multiple after: correct position' );
						equals( $( '#inserts-multiple-after-2' ).next( '.inserted-multiple-after' ).length, 1, 'Inserted multiple after: correct position' );
						equals( $( '.inserted-multiple-before' ).length, 2, 'Inserted multiple before' );
						equals( $( '#inserts-multiple-before-1' ).prev( '.inserted-multiple-before' ).length, 1, 'Inserted multiple before: correct position' );
						equals( $( '#inserts-multiple-before-2' ).prev( '.inserted-multiple-before' ).length, 1, 'Inserted multiple before: correct position' );
				} )
				.bind( 'tdi:ajax:scriptsDone', function( evt, data ) {
					var s1 = data.scripts[0],
						s2 = data.scripts[1],
						s3 = data.scripts[2];

					equals( s1.script_src, undefined );
					equals( s1.script_data, "test( 'TDI.Ajax.Response: inline script', function() {\n\
			expect(1);\n\
			\n\
			ok( true, 'Inline script executed.' );\n\
		} );" );
					equals( s1.script_id, undefined );
					equals( s1.script_node, undefined );
					ok( s1.script_node_inline, "Script 1 inline tag exists" );

					equals( s2.script_src, 'responses/script1.js' );
					equals( s2.script_data, "" );
					equals( s2.script_id, undefined );
					ok( s2.script_node, "Script 2 tag exists" );
					equals( s2.script_node_inline, undefined );

					equals( s3.script_src, 'responses/script2.js' );
					equals( s3.script_data, "if ( window._TDI_TEST_SCRIPT_EXTERNAL_2 = true ) {\n\
			test( 'TDI.Ajax.Response: external script with inline script', function() {\n\
				expect(3);\n\
				\n\
				ok( true, 'External script loaded and inline script executed.' );\n\
				equals( $( '#script2' ).length, 1, 'External script with ID.' );\n\
				equals( $( '#script2_inline' ).length, 1, 'Inline script with ID.' );\n\
			} );\n\
		}" );
					equals( s3.script_id, "script2" );
					ok( s3.script_node, "Script 3 tag exists" );
					ok( s3.script_node_inline, "Script 3 inline tag exists" );
				} )
				.bind( 'tdi:ajax:stylesDone', function( evt, data ) {
					// check the API data (expect 1 style)
						equals( data.styles[0].style_src, 'responses/style.css', 'Style: src' );
						equals( data.styles[0].style_id, 'style1', 'Style: id' );

					// check the markup
						equals( $( '#style1' ).length, 1, 'Style loaded.' );
				} )
				.bind( 'tdi:ajax:popupsDone', function( evt, data ) {
					// 3 popups are expected
						var p1 = data.popups[0],
							p2 = data.popups[1],
							p3 = data.popups[2];

						equals( p1.href, 'responses/popup1.html', 'Popup: correct URL' );
						equals( p2.href, 'responses/popup2.html', 'Dialog (default): correct URL' );
						equals( p2.width, 600, 'Dialog (default): correct width' );
						equals( p2.height, 500, 'Dialog (default): correct height' );
						equals( p3.href, 'responses/popup3.html', 'Dialog: correct URL' );
						equals( p3.width, 300, 'Dialog: correct width' );
						equals( p3.height, 300, 'Dialog: correct height' );

						p1.popup.close();
						p2.popup.close();
						p3.popup.close();

				} )
				.bind( 'tdi:ajax:unknownsDone', function( evt, data ) {
					// 5 unknowns are expected
						var u1 = data.unknowns[0],
							u2 = data.unknowns[1],
							u3 = data.unknowns[2],
							u4 = data.unknowns[3],
							u5 = data.unknowns[4];

						equals( u1._name, 'message', 'Message: correct instruction name' );
						equals( u1.severity.toUpperCase(), 'INFO', 'Message: correct severity' );
						equals( u1.contents, 'Info message 1', 'Message: correct text' );
						equals( u1.title, 'Info message 1 title', 'Message: correct title' );
						equals( u2._name, 'message', 'Message: correct instruction name' );
						equals( u2.name, 'message-name', 'Message: correct name' );
						equals( u2.severity.toUpperCase(), 'ERROR', 'Message: correct severity' );
						equals( u2.contents, 'Info message 2', 'Message: correct text' );
						equals( u2.title, undefined, 'Message: correct title' );
						equals( u3._name, 'dialog', 'Dialog: correct instruction name' );
						equals( u3.contents, 'This is a dialog!', 'Dialog: correct contents' );
						equals( u3.width, "500", 'Dialog: correct width' );
						equals( u3.id, 'dialog1', 'Dialog: correct id' );
						equals( u3.height, "400", 'Dialog: correct height' );
						equals( u4._name, 'dialog', 'Dialog: correct instruction name' );
						equals( u4.action, 'open', 'Dialog: correct action' );
						equals( u4["cancel-url"], 'cancel/url', 'Dialog: correct cancel URL' );
						equals( u4.id, 'dialog2', 'Dialog: correct id' );
						equals( u5._name, 'dialog', 'Dialog: correct instruction name' );
						equals( u5.action, 'close', 'Dialog: correct action' );
						equals( u5.id, 'dialog3', 'Dialog: correct id' );
				} )
				.bind( 'tdi:ajax:done', function( evt, data ) {
					var r = data.responses;
					setTimeout( function() {
						equals( r.updates && r.updates.length, 10, 'Ajax done: updates' );
						equals( r.inserts && r.inserts.length, 6, 'Ajax done: inserts' );
						equals( r.scripts && r.scripts.length, 3, 'Ajax done: scripts' );
						equals( r.styles && r.styles.length, 1, 'Ajax done: styles' );
						equals( r.popups && r.popups.length, 3, 'Ajax done: popups' );
						equals( r.unknowns && r.unknowns.length, 5, 'Ajax done: unknowns' );

						start();
					}, 1000 );
				} );
				
		// send the request
			TDI.Ajax.Request.send( 'responses/full.xml' );
	} );
	