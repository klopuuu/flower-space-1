const {User, BinderBouquet, Bouquet} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const iconv = require('iconv-lite')

class PdfController {
    async createPdf(req, res) {
        let {id} = req.params
        let info = await BinderBouquet.findOne({where:{userId: id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let idclient = info.id
        let bouquet = await Bouquet.findAll({where:{binderbouquetId: idclient, id_category:1, boleanOrder:true}})
        let user = await User.findOne({where:{id}})
        let pdfDoc = new PDFDocument;
        pdfDoc.pipe(fs.createWriteStream(`pdf/bouquet${id}.pdf`));
        pdfDoc.font('fonts/a_groticextrablack.ttf')
        pdfDoc.fillColor('black')
        pdfDoc.fontSize(25)
        pdfDoc.text("ПРАЙС БУКЕТОВ", {align:"center"})
        pdfDoc.fontSize(14)
        pdfDoc.text(`@${user.name} ${user.surname}`, {align:"center"})
        pdfDoc.moveDown(2)
        for(const item of bouquet){
            pdfDoc.fillColor('black')
            pdfDoc.fontSize(16)
            pdfDoc.image(item.img, {width:200, height:200});
            pdfDoc.moveDown(0.5)
            pdfDoc.text(item.name, {encoding: 'utf-8'})
            pdfDoc.moveDown(0.5)
            pdfDoc.text(`${item.price}  руб.`)
            pdfDoc.moveDown(1)
 
        }
        pdfDoc.end();
        return res.json("success")

    }
}

module.exports = new PdfController()